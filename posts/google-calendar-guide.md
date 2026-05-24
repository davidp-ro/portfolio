---
title: "The Google Calendar API: A (not) definitive guide"
description: "I went through a lot of pain integrating with the Google Calendar API - here's what I learned."
date: "2026-05-24"
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
  - [Internal/holiday calendar detection](#internalholiday-calendar-detection)
  - [Use shared/private extended attributes](#use-sharedprivate-extended-attributes)
  - [Set attendees properly (ie: as organizer)](#set-attendees-properly-ie-as-organizer)
  - [ICS files - they are horrible, treat them like timezones and don't try to reinvent the wheel](#ics-files---they-are-horrible-treat-them-like-timezones-and-dont-try-to-reinvent-the-wheel)
  - [The event URLs will become useless if you move an event](#the-event-urls-will-become-useless-if-you-move-an-event)
- [Different ways I messed up](#different-ways-i-messed-up)
  - [Pretty much everything can be `null`](#pretty-much-everything-can-be-null)
  - [Exponential backoff everywhere](#exponential-backoff-everywhere)
  - [OAuth Scopes (or how there's no need to require a million scopes)](#oauth-scopes-or-how-theres-no-need-to-require-a-million-scopes)

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
  <caption>TLDR: ✅ = One Event, ✴️ = Two Events, ❌ = No Events (on B's calendar)<sup>†</sup></caption>
  <thead>
    <tr>
      <th scope="col">B's "Add invitations..." settings</th>
      <th scope="col"><code>iCalUID</code> = <code>UID</code>?</th>
      <th scope="col">Outcome</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">From everyone</th>
      <td>No</td>
      <td>✴️ B will have two events on their calendar</td>
    </tr>
    <tr>
      <th scope="row">From everyone</th>
      <td><b>Yes</b></td>
      <td>✅ B will have one event on their calendar</td>
    </tr>
    <tr>
      <th scope="row">Only if the sender is known</th>
      <td>No</td>
      <td>
        <i>Is this the first time we've interacted with B?</i>
        <ul>
          <li>Yes: ❌ → ✴️ B won't have ANY events initially, and after they accept, they will have two events on their calendar</li>
          <li>No: ✴️ B will have two events on their calendar</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th scope="row">Only if the sender is known</th>
      <td><b>Yes</b></td>
      <td>
        <i>Is this the first time we've interacted with B?</i>
        <ul>
          <li>Yes: ❌ → ✅ B won't have ANY events initially, and after they accept, they will have one event on their calendar</li>
          <li>No: ✅ B will have one event on their calendar</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th scope="row">When I respond to the invitation in email</th>
      <td>No</td>
      <td>❌ → ✴️ B won't have ANY events initially, and after they accept, they will have two events on their calendar</td>
    </tr>
    <tr>
      <th scope="row">When I respond to the invitation in email</th>
      <td><b>Yes</b></td>
      <td>❌ → ✅ B won't have ANY events initially, and after they accept, they will have one event on their calendar</td>
    </tr>
  </tbody>
</table>

- What you should be able to notice at this point, is that if we don't manually specify an `iCalUID` when creating the Google Calendar event on the Calendar we manage, <b>that we then also use as the `UID` for any iCalendar files we create</b>, our attendee will end up with two events on their calendar.<sup>‡</sup>

### Other tips & tricks around identifiers:

- You should not expect Google's `id` field to be of a specific format. I have personally seen it change as time went on, plus, as previously mentioned, it can be provided by third parties. Same goes for the `iCalUID` as far as formats go!

- However, while not a standard per-se, the `iCalUID` should generally be structured like this: `<some-unique-id>@<domain>`.
  - It's highly recommended to have the domain suffix, as it greatly helps avoid collisions (Added Benefit: it also makes it easier to identify which events were created by you - but obviously it's not a guarantee).
  - For example, at SalesKick, our UIDs look something like this: `bkg-<shortUUID>@saleskick.com`, where the first part corresponds 1:1 with an internal record.

<small><u><i>Notes:</i></u></small>

<sup>\*</sup> Some clients may also use `DTSTAMP` to compare updates. As a rule of thumb, you should always set this timestamp to the current time when making any updates.

<sup>†</sup> Apologies for the use of emojis, but it was an easy way to visualize this.

<sup>‡</sup> This is assuming that B is using Google Calendar as well. If they're using a different calendar client, the behavior may be different, but it will probably only show up after accepting the invite (and it won't create two events, since the "Google Event" wouldn't exist for B).

## Internal/holiday calendar detection

aa

## Use shared/private extended attributes

aa

## Set attendees properly (ie: as organizer)

aa

## ICS files - they are horrible, treat them like timezones and don't try to reinvent the wheel

aa

## The event URLs will become useless if you move an event

aa

---

# Different ways I messed up

## Pretty much everything can be `null`

bb

## Exponential backoff everywhere

bb

## OAuth Scopes (or how there's no need to require a million scopes)

bb
