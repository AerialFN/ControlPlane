# Aerial Control Plane (ACP)

A stateless, serverless, dockerized NodeJS HTTP interaction server.

## How does it work?

This app handles incoming HTTP requests according to Discord's HTTP Interactions
scheme. The requests are signed by Discord and validated upon arrival.

This app doesn't connect to the Discord Gateway at all. Neither does it use any
pre-existing Discord library, instead it uses its' own route and interaction
handling code (that could admittedly be better).

Because Cloud Run bills per HTTP request, this means that servers are "asleep"
while they're not receiving HTTP requests (like repl). Therefore, "normal" 2-way
communication between this and the [Runner](https://github.com/AerialFN/Runner)
is impossible. Instead, the ACP sends the Runner instructions via MQTT. When
the Runner wants to pass something back to the user, it uses a method to DM the
user. These requests are also signed and validated, albeit with a different key.

User data is stored in Firestore using `firebase-admin` SDK. Authentication is
performed using GCP's already-included environment variables. Because of this,
deployment to anywhere other than GCP with Firestore is currently impossible.

## Copyright (aka notice to anyone trying to copy the bot)

Aerial is licensed under the AGPL 3.0 license. This means that:

- Every user has the right to download, modify, and redistribute this software.
- This includes anyone that interfaces with it over the network. (e.g. Discord)
- If you modify and redistribute the software, it _must_ have the same or later
  GPL license. This means that the license (summarized in these bullet points)
  also apply to YOUR modified version of the code. **You have to make it
  open-source.**
- Moreover, the copyright notice in the `/about` command **must** be preserved.
  If the `/about` command is removed, place it somewhere else where **every**
  user can access it.
- NO WARRANTY is provided with this software.

See the `COPYING` file for more details.
