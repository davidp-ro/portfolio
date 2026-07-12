---
title: "The Google Calendar API: A (not) definitive guide"
description: "I went through a lot of pain integrating with the Google Calendar API - here's what I learned."
date: "2026-07-12"
author: "David Pescariu"
tags: ["typescript", "google-calendar", "api", "guide"]
---

These are in no particular order, and may or may not be "best practices" (no guarantees!). What they are however, are the things I wish I had known before working with the Google Calendar API, and, to some extent, calendars in general. I hope this saves you some time and frustration!

For what it's worth, these were discovered while working on [SalesKick](https://saleskick.com), a service that interacts with Calendars **a lot**, so during the last 3 years I had plenty of time to make mistakes. Enjoy!

---

# Contents

- [Tips](#tips)
  - [You probably shouldn't rely on `sendUpdates`](#you-probably-shouldnt-rely-on-sendupdates)
  - [The `iCalUID` is your friend, while Google's `id` is probably not](#the-icaluid-is-your-friend-while-googles-id-is-probably-not)
    - [When are events created on the Attendee's Google Calendar? (Reference Table)](#when-are-events-created-on-the-attendees-google-calendar-reference-table)
    - [Other tips & tricks around identifiers:](#other-tips--tricks-around-identifiers)
  - [OAuth and User Access](#oauth-and-user-access)
    - [OAuth Scopes](#oauth-scopes)
    - [OAuth Verification](#oauth-verification)
    - [Loosing access to accounts](#loosing-access-to-accounts)
  - [Internal/holiday calendar detection](#internalholiday-calendar-detection)
  - [Use shared/private extended attributes](#use-sharedprivate-extended-attributes)
  - [Set attendees properly](#set-attendees-properly)
  - [iCalendar (.ics) files](#icalendar-ics-files)
- [Different ways I messed up](#different-ways-i-messed-up)
  - [Pretty much everything can be `null`](#pretty-much-everything-can-be-null)
  - [Exponential backoff everywhere](#exponential-backoff-everywhere)

---

# Tips

## You probably shouldn't rely on `sendUpdates`

If you look at the documentation for the methods that create or update events ([insert](https://developers.google.com/workspace/calendar/api/v3/reference/events/insert), [move](https://developers.google.com/workspace/calendar/api/v3/reference/events/move), [update](https://developers.google.com/workspace/calendar/api/v3/reference/events/update), etc), you'll notice that all of them have a `sendUpdates` query parameter.

Now, you might think that you should **absolutely** use this (set to `all` or `externalOnly`) to make sure that everyone gets notified of the changes - fair enough! Especially considering that Google's documentation says:

> **Warning**: Using the value none can have significant adverse effects, including events not syncing to external calendars or events being lost altogether for some users. [...]

I'm here to tell you that, if you're dealing with any sort of moderate to high volume of events, you must always set this parameter to `none` otherwise you **will** get rate limited (`403` with `quotaExceeded`, but with plenty of Quota displayed in the Cloud Console) almost immediately:

```js
{
  domain: 'usageLimits',
  reason: 'quotaExceeded',
  message: 'Calendar usage limits exceeded.'
}
```

As I've had the pleasure of finding out with [this bug report](https://issuetracker.google.com/issues/321394804) I submitted a few years ago, it is actually intended behavior that this triggers spam prevention.

The workaround is to set `sendUpdates=none` and then send your own notifications to attendees. ICS files are their own beast as well, but more on that later.

## The `iCalUID` is your friend, while Google's `id` is probably not

This one's slightly more specific - I'm particularly referring to this in the context of being the "event creator" (the scheduling platform). When creating events, you can specify both `iCalUID` and `id` (but not at the same time). The documentation explains the difference between the two very clearly:

> Note that the icalUID and the id are not identical and only one of them should be supplied at event creation time. One difference in their semantics is that in recurring events, all occurrences of one event have different ids while they all share the same icalUIDs.

Thing is, if you're the scheduling platform, odds are you want to be able to send invites to your attendees. To keep a very long story short, with ICS files, there are two very important fields used to order updates - the `UID` and the `SEQUENCE`.<sup>\*</sup>

Let's look at the following scenario:

- You create an event ([insert](https://developers.google.com/workspace/calendar/api/v3/reference/events/insert)) with the following attendees:
  - <b>A</b> - who's also the organizer, and owns the calendar we're creating the event onto
  - <b>B</b> - who's just an attendee - they may or may not be using Google Calendar

- Now, you'll also need to send B a Calendar Invite (.ics file). The following thing will happen on B's calendar, depending on a few things:

### When are events created on the Attendee's Google Calendar? (Reference Table)

<table>
  <caption>Legend: <SuccessIcon></SuccessIcon> = One Event, <DuplicateIcon></DuplicateIcon> = Two Events, <FailIcon></FailIcon> = No Events (on B's calendar)</caption>
  <thead>
    <tr>
      <th scope="col">B's "Add invitations..." settings</th>
      <th scope="col"><code>iCalUID</code> = <code>UID</code>?</th>
      <th scope="col">Outcome</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" rowspan="2">From everyone</th>
      <td style="text-align: center;">No</td>
      <td><DuplicateIcon></DuplicateIcon> B will have two events on their calendar</td>
    </tr>
    <tr>
      <td style="text-align: center;">Yes</td>
      <td><SuccessIcon></SuccessIcon> B will have one event on their calendar</td>
    </tr>
    <tr style="background-color: #1a1a1a;">
      <th scope="row" rowspan="2">Only if the sender is known</th>
      <td style="text-align: center;">No</td>
      <td>
        <i>Is this the first time we've interacted with B?</i>
        <ul>
          <li>Yes: <FailIcon></FailIcon> → <DuplicateIcon></DuplicateIcon> B won't have ANY events initially, and after they accept, they will have two events on their calendar</li>
          <li>No: <DuplicateIcon></DuplicateIcon> B will have two events on their calendar</li>
        </ul>
      </td>
    </tr>
    <tr style="background-color: #1a1a1a;">
      <td style="text-align: center;"><b>Yes</b></td>
      <td>
        <i>Is this the first time we've interacted with B?</i>
        <ul>
          <li>Yes: <FailIcon></FailIcon> → <SuccessIcon></SuccessIcon> B won't have ANY events initially, and after they accept, they will have one event on their calendar</li>
          <li>No: <SuccessIcon></SuccessIcon> B will have one event on their calendar</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th scope="row" rowspan="2">When I respond to the invitation in email</th>
      <td style="text-align: center;">No</td>
      <td><FailIcon></FailIcon> → <DuplicateIcon></DuplicateIcon> B won't have ANY events initially, and after they accept, they will have two events on their calendar</td>
    </tr>
    <tr>
      <td style="text-align: center;"><b>Yes</b></td>
      <td><FailIcon></FailIcon> → <SuccessIcon></SuccessIcon> B won't have ANY events initially, and after they accept, they will have one event on their calendar</td>
    </tr>
  </tbody>
</table>

- What you should be able to notice at this point, is that if we don't manually specify an `iCalUID` when creating the Google Calendar event on the Calendar we manage, <b>that we then also use as the `UID` for any iCalendar files we create</b>, our attendee will end up with two events on their calendar.<sup>†</sup>

### Other tips & tricks around identifiers:

- You should not expect Google's `id` field to be of a specific format. I have personally seen it change as time went on, plus, as previously mentioned, it can be provided by third parties. Same goes for the `iCalUID` as far as formats go!

- However, while not a standard per-se, the `iCalUID` should generally be structured like this: `<some-unique-id>@<domain>`.
  - It's highly recommended to have the domain suffix, as it greatly helps avoid collisions (Added Benefit: it also makes it easier to identify which events were created by you - but obviously it's not a guarantee).
  - For example, at SalesKick, our UIDs look something like this: `bkg-<shortUUID>@saleskick.com`, where the first part corresponds 1:1 with an internal record.

<small><u><i>Notes:</i></u></small>

<sup>\*</sup> Some clients may also use `DTSTAMP` to compare updates. As a rule of thumb, you should always set this timestamp to the current time when making any updates.

<sup>†</sup> This is assuming that B is using Google Calendar as well. If they're using a different calendar client, the behavior may be different, but it will probably only show up after accepting the invite (and it won't create two events, since the "Google Event" wouldn't exist for B).

## OAuth and User Access

### OAuth Scopes

Here, it was definitely my lackluster understanding of Google's OAuth scopes that caused headaches, but hey, we're supposed to learn from mistakes!

When I first started implementing Google Calendar, I assumed I would need to request all these:

- `https://www.googleapis.com/auth/calendar`
- `https://www.googleapis.com/auth/calendar.calendarlist`
- `https://www.googleapis.com/auth/calendar.events`
- `https://www.googleapis.com/auth/calendar.events.owned`

However, in reality, the only one you need to have full access to Calendar Lists, Events, everything, is `https://www.googleapis.com/auth/calendar`. The others are redundant. Of course, assuming your system cannot work with less... you should always respect the principle of least privilege and only request the scopes you need. For example, if your system only needs to read events, you can use `https://www.googleapis.com/auth/calendar.events.readonly` instead of the full access scope.

### OAuth Verification

If you use sensitive Google OAuth scopes (which the Calendar ones are), if you set the audience to "External", you will need to go through a verification process. Until you do, when you try to log in and authorize your app, you will the big scary warning that says "This app isn't verified".

**Recommendations:**

- Go through the verification process _before_ (duh!) you run out of the 100 user cap for unverified apps. If you don't, the entire process just ends up being quite a lot more annoying. _Ask me how I know..._ If you do end up running out of users before verification:
  - Do not bother asking for an exception/increase - it will be denied.
  - It will likely not be an issue as far as the verification goes, because when recording the demo video, you can just use an account that had already been authorized.

- For the demo, make sure to demonstrate how you use each scope - for example we had Google Calendar and Google Sheets scopes, so we had to show how we used both of them.

- Be prepared to have to make changes to your app if requested. In our case, we had to remove the Spreadsheets scope, and switch to using the [`drive.file` scope](https://developers.google.com/workspace/drive/api/guides/api-specific-auth#benefits) in order to continue the verification process. This was because the Spreadsheets scope was considered too broad and we were not following the principle of least privilege.

- The entire process took about a month from us, to go from the initial submission, to implementing the requested changes, to getting verified. Make sure you can plan for this in your timeline.
  - With this being said, the verification team was very responsive - you could generally expect a reply within 48 hours.

### Loosing access to accounts

You must be prepared to lose access to account, calendars, etc:

- Resources (accounts, calendars, etc) get deleted as, for example, employees leave a company.
- Users can revoke access to your app at any time.
- Your user can lose access to shared calendars.

Detection can happen by analyzing the API responses (errors, especially), and whenever you get a "traditional" 403, etc, start your "access lost" process.

## Internal/holiday calendar detection

You probably noticed that in Google Calendar, there are some "default" events that are automatically added - for example "New Year's Day". These are coming from what are commonly referred to as holiday or observance calendars. Now, unless you're building a calendar client, you probably don't want to sync these events into your system.

We can look, for example at the "Holidays in United States" calendar, which has the following ID: `en.usa#holiday@group.v.calendar.google.com`. Note the `@group.v.calendar.google.com` suffix - this is what we can use to filter out these calendars.

<FailIcon></FailIcon> **Important:** Do not filter out `@group.calendar.google.com` (without the "v") calendars! These are calendars that were created by users, and are not holiday/observance calendars. For example, their IDs can look something like this: `c_c5e09...2fdc@group.calendar.google.com`.

Another set of calendars that you may want to filter out, are calendars that have been imported. For example, I have an "F1 Calendar" one that's imported from a URL ([this one](https://files-f1.motorsportcalendars.com/f1-calendar_p1_p2_p3_qualifying_sprint_gp.ics?t=1675449333421) in case you want it too!), and if our system is only interested in processing user events, we can ignore these as well. Their IDs will have the following suffix: `@import.calendar.google.com`.

**Quick Reference Table:**

<table>
  <thead>
    <tr>
      <th scope="col">Calendar Type</th>
      <th scope="col">Safe to Filter Out</th>
      <th scope="col">ID Suffix</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Holiday/Observance</td>
      <td>Yes</td>
      <td><code>@group.v.calendar.google.com</code></td>
    </tr>
    <tr>
      <td>Imported</td>
      <td>Yes</td>
      <td><code>@import.calendar.google.com</code></td>
    </tr>
    <tr>
      <td>User-created</td>
      <td><b>No</b></td>
      <td><code>@group.calendar.google.com</code></td>
    </tr>
    <tr>
      <td>User's default Calendar (<code>primary</code>)</td>
      <td><b>No</b></td>
      <td>Varies - it will typically be the user's email</td>
    </tr>
  </tbody>
</table>

## Use shared/private extended attributes

This is a very quick tip - you will likely want to have a way of knowing which events were creating/updated/etc by your system. The naive approach is to update the `description` with some sort of identifier, but this is not a good idea for a few reasons, but the most obvious one is that the description can be edited by a user from the UI.

The "proper" way to do this, is to use one of the [two extended attributes fields](https://developers.google.com/workspace/calendar/api/v3/reference/events#:~:text=writable-,extendedProperties,-object) that Google Calendar provides:

- `extendedProperties.private` - "Properties that are private to the copy of the event that appears on this calendar";
- `extendedProperties.shared` - "Properties that are shared between copies of the event on other attendees' calendars".

You can store arbitrary key-value pairs in these fields, and they will be preserved when the event is updated. Do note that they can be overwritten at any time by any API users, so you should not use these as a singular place to store information - always have your own internal record of any data you may need.

## Set attendees properly

Another short one, but I have previously made the mistake of not setting this properly.

**Organizers:**

When creating events, you should always set the `organizer` field, and add the Organizer as an attendee as well. There could be some situations where maybe you don't want to have them be an attendee, but in generale they should be added. A subsequent tip is to ensure that you set [`organizer: true`](https://developers.google.com/workspace/calendar/api/v3/reference/events#:~:text=attendees%5B%5D.organizer) for the organizer in the `attendees` array.

**Statuses:**

Each attendee has a `responseStatus` field, which should be set as following:

- For the Organizer (if present) - set to `accepted`, because you own the event creation and can ensure it ends up on the calendar
- For additional attendees, you **must** set it to `needsAction`, otherwise you risk the event not showing up on their calendar, or having an incorrect status (they haven't actually accepted, but you marked it as such).

You can find more details in the [`attendees[].responseStatus` docs](https://developers.google.com/workspace/calendar/api/v3/reference/events#:~:text=attendees%5B%5D.responseStatus).

## iCalendar (.ics) files

There's a great video from Tom Scott on the Computerphile YouTube channel that goes over timezones: [The Problem with Time & Timezones - Computerphile](https://www.youtube.com/watch?v=-5wpm-gesOY). The conclusion of that video is that if you can avoid having to work with timezones, you absolutely should, and if you cannot avoid it, you should use a library that handles them for you.

The iCalendar specification - [RFC 5545](https://datatracker.ietf.org/doc/html/rfc5545), originally published in 1998 - is at the core of how calendar clients communicate with each other. However, as it usually is with this sort of things, there are so many things you need to watch out for (one example being how lines should be folded, under a specific number of characters, and with the proper line endings), that you should not try to implement this yourself.

The library we ended up using is [ics](https://www.npmjs.com/package/ics), and it has been working well for us.

**Sequencing:**

As previously mentioned before, an important field in the .ics files is the `SEQUENCE` field. This is used to determine if an update is newer than the previous one.

- The initial invite should have `SEQUENCE:0`.
- Any subsequent updates should update the sequence in a "monotonically incremented" manner. The proper way of doing this is to keep track of the sequence in your own system, and increment it every time you make an update.
  - However, there's one more way of doing it - there isn't an explicit requirement that the sequence must be incremented by 1, so you can also use a timestamp as the sequence number, this way you can naturally ensure that the sequence is always increasing.

---

# Different ways I messed up

> If you work with calendars and nothing seems broken... you just haven't found the issue yet.

## Pretty much everything can be `null`

I cannot emphasize this enough - the only Event fields that will always be present are `id`, `kind` and `etag`. Everything else could be `null` or missing entirely, so you need to constantly be aware that many fields may not be available.

If the event isn't cancelled/deleted, you can generally expect the following fields to also be present:

- `start` and `end` _(be careful to treat all-day events properly, as they will have a `date` instead of `dateTime`)._
- `iCalUID`
- `htmlLink`

Some of the tricky ones to handle:

- `status` - it depends on what your product/system is supposed to do to decide if you treat this as `cancelled` or `confirmed`. We chose to default to `confirmed`.
- `organizer` - can be entirely null or just be missing properties like `email`.
- `created` - genuinely don't understand how Google Calendar could allow this to be `null`, but yes it can be - have seen it happen in production.
- `creator` - similar to `organizer`, can be null or missing properties like `email`.
- `summary` and `description` - both can be `null` or empty strings.
- `transparency` - this is an expected one, and as the documentation says, if not provided, you **must** consider it as `opaque` (busy).
- `eventType` - if not provided, you should just treat it as `default`.

## Exponential backoff everywhere

This is something that can be applied when working with any external APIs, but it's worth mentioning here. You should always implement backoff strategies when working with this API in particular, and you should be aware of the [rate limits](https://developers.google.com/workspace/calendar/api/guides/quota) that apply, as some may require you to backoff more aggressively than others.

**Additional notes:**

- Reconciliation/Matching or Syncing jobs should be designed to be idempotent and retryable.
- Be aware that some limits may be lower for newly created projects, accounts, etc - [details](https://knowledge.workspace.google.com/admin/calendar/avoid-calendar-use-limits?visit_id=639194457610867869-2885663962&rd=1#usage_guidelines_for_paid_accounts).
