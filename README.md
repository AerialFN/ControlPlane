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

## How do I deploy it?

1. Create a new [Google Cloud Platform (GCP)](https://cloud.google.com) project.

2. Create a new [Firebase](https://firebase.google.com) project attached to the
   GCP project.

3. Enable Firestore for your Firebase project.

4. Build the container and push it to Artifact Registry.

5. Create a [Cloud Run](https://cloud.google.com/run/) deployment, it will fail
   to start.

6. Go into Cloud Run instance settings, set environments according to env
   variable section below.

7. Set the minimum amount of instances running to 1. This ensures that a server
   is always available to handle a request within 3 seconds (after that it times
   out).

8. Redeploy and enjoy! 🎉

## Environment Variables

The server will exit with status code 1 if any are missing.

| Name         | Explanation                   |
| ------------ | ----------------------------- |
| `PUBLIC_KEY` | The Discord app's public key. |
