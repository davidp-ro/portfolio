---
title: "The Google Calendar API: A (not) definitive guide"
description: "I went through a lot of pain integrating with the Google Calendar API - here's what I learned."
date: "2026-05-24"
author: "David Pescariu"
tags: ["typescript", "google-calendar", "api", "guide"]
---

These are in no particular order, and may or may not be "best practices" (no guarantees!). What they are however, are the things I wish I had known before working with the Google Calendar API. I hope this saves you some time and frustration!

For what it's worth, these were discovered while working on [SalesKick](https://saleskick.com), a tool that interacts with Calendars **a lot**, so during the last 3 years I had plenty of time to make mistakes. Enjoy!

---

# Contents

- [Tips](#tips)
  - [Do not use `sendUpdates`](#do-not-use-sendupdates)
  - [The `iCalUID` is your friend, while Google's `id` is probably not](#the-icaluid-is-your-friend-while-googles-id-is-probably-not)
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

## Do not use `sendUpdates`

aa

## The `iCalUID` is your friend, while Google's `id` is probably not

aa

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
