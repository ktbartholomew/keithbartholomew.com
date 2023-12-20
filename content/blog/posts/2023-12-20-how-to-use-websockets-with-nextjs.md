---
title: "How to use WebSockets with Next.js"
date: 2023-12-01T17:00:00.000Z
excerpt: ""
---

_See the full demo [on GitHub](https://github.com/ktbartholomew/tanstack-query-pubsub/tree/nextjs-websocket)_

[Next.js](https://nextjs.org/) is a powerful framework for building React applications that have both dynamic back-ends and front-ends. You can build a variety of different apps using Next.js, from a completely statically-generated site (that's what this website is!) to partially server-rendered application, to a completely client-rendered application.

In all of these use cases, Next.js is optimized for the traditional request/response cycle that most of the web is known for. A client sends the server a request for a page or some content, then the server sends the requested content to the client and closes the connection. This works great when the client knows that it needs to get new data, but what about when the server needs to notify the client that something happened or the application needs real-time behavior like chatting or streaming updates from a back-end service.

Enter [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), a technology that opens a long-lived TCP connection between the client and server and allows both sides to send messages to one another. WebSockets allow high-throughput, bi-directional communication that unlocks a lot of possibilities for rich, real-time applications.

> _You could also use [Server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) to achieve something similar, but Server-sent events only allow the server to stream data to the client (it's one-way). We're using WebSockets here because they're more widely used and support more use cases like bi-directional communication._

Next.js doesn't support WebSockets out of the box, but getting WebSockets to work alongside a Next.js is pretty straightforward to do.

## Create a custom server

Normally, you start a Next.js application by running a command like `next dev` or `next start`. When you do this, Next.js starts its own HTTP server that listens for incoming requests and serves the desired content for each request.

Next.js allows you to specify your own [custom server](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server), in which you can customize how incoming requests are handled. We'll use this feature to add support for WebSockets while preserving the rest of the usual Next.js functionality.

You could use whatever tools you want to create this server, but I'll use [Express](https://expressjs.com/) because it's a choice I'm familiar with.

1. Create a file named `server.ts`.
1. Import Express and start its server.

   ```typescript
   // server.ts
   import { Server } from "node:http";
   import express from "express";

   const app = express();

    /**
     * Start the Express app, get a `http.Server` in return
     */
   const server: Server = app.listen(3000);
   ```

1. When using a custom server, the Next.js application exports itself as a class with a `getRequestHandler()` method. When Express handles an incoming request, call the Next.js request handler immediately.

   ```typescript
   import next from "next";
   import { parse } from "node:url";
   
   /**
    * Start by creating and preparing a Next.js app.
    */
   const nextApp = next({ dev: process.env.NODE_ENV !== "production" });
   await nextApp.prepare();
   
   /**
    * Pass all plain HTTP requests from Express to the Next.js request handler.
    * `app` is the Express app we started earlier.
    */
   app.use((req, res, next) => {
     nextApp.getRequestHandler()(req, res, parse(req.url, true));
   });
   ```

   In this example, I'm passing all incoming requests directly to Next.js. You could also use this technique to only pass _certain_ requests to Next.js, or to alter or authorize incoming requests.

1. Add basic WebSocket handling by writing a handler for the server's [`upgrade`](https://nodejs.org/api/http.html#event-upgrade) event. This handler has two jobs to do—although Next.js doesn't support custom WebSockets out of the box, it actually does use a WebSocket connection for its [Fast Refresh](https://nextjs.org/docs/architecture/fast-refresh) development feature. We don't want to break that feature, so we'll use the Next.js application's `getUpgradeHandler()` when the WebSocket request path is `/_next/webpack-hmr`. Otherwise, we'll do our custom WebSocket handling.


   ```typescript
   server.on("upgrade", (req, socket, head) => {
     const { pathname } = parse(req.url || "/", true);
   
     /**
      * Pass hot module reloading requests to Next.js
      */
     if (pathname === "/_next/webpack-hmr") {
       nextApp.getUpgradeHandler()(req, socket, head);
     }
   
     /**
      * Use another path for our custom WebSocket handler
      */
     if (pathname === "/api/ws") {
       // TODO: write a custom WebSocket handler
     }
   });
   ```

## Build and run the custom server

Because we wrote `server.ts` using TypeScript, we need bundle it and convert it to plain JavaScript before we run it. Then, we need to configure our package scripts to run the custom server instead of the one built in to Next.js.

1. Install `esbuild`

   ```bash
   npm install --save-dev esbuild
   ```

1. Add a script to `package.json` that uses `esbuild` to bundle the custom server.

   ```json
   {
     "scripts": {
         "bundle": "esbuild server.ts --bundle --platform=node --outdir=dist --external:next*"
     }
   }
   ```

   The `--external:next*` argument prevents `esbuild` from trying to include all of the Next.js source code in our custom server.

1. Modify the other Next.js lifecycle scripts in `package.json` to include our bundling step and run the custom server.

   ```json
   {
     "scripts": {
        "build": "npm run bundle && next build",
        "dev": "npm run bundle && node dist/server.js",
        "start": "node dist/server.js"
     }
   }
   ```


## Handle WebSocket requests

Now that we've created a custom server that's capable of handling WebSocket requests, we can write some code to do something with those requests when they're created. In the [example I created](https://github.com/ktbartholomew/tanstack-query-pubsub/tree/nextjs-websocket), I made a service that generates random restaurant orders every few seconds and sends them to all connected WebSocket clients.

1. Install the [`ws`](https://github.com/websockets/ws) library.

   ```bash
   npm install ws
   ```

1. Use `ws` to create a handler for WebSocket upgrade requests, but don't listen on a port (Express is already doing that part).

   ```typescript
   import { WebSocketServer } from "ws";

   const wss = new WebSocketServer({ noServer: true });
   ```

1. Write a function to handle upgrade reqeusts using `ws`. For convenience, we'll make this function have the exact same signature as the Next.js `getUpgradeHandler()` method.

    ```typescript
    import { RawData, WebSocket } from "ws";
    import { IncomingMessage } from "http";
    import internal from "stream";

    export function handleUpgrade(
      req: IncomingMessage,
      socket: internal.Duplex,
      head: Buffer
    ) {
        wss.handleUpgrade(req, socket, head, (client: WebSocket) => {
            /**
             * `client` is a single unique WebSocket connection. Here we can subscribe
            * to backend events that we want to send to the client and handle
            * messages that the client sends to us.
            */
            client.send("hello!");

            client.on("message", (data: RawData, isBinary: boolean) => {
            console.log(data.toString());
            });
        });
    }
    ```

1. Add the custom upgrade handler to our custom server's `upgrade` event handler, which we created in the "Create a custom server" section.

   ```typescript
   import { handleUpgrade } from "./websocket";

   /**
    * Use another path for our custom WebSocket handler
    */
   if (pathname === "/api/ws") {
     handleUpgrade(req, socket, head);
   }
   ```

1. Extend the upgrade handler to do more than just say "hello!". It will subscribe to an instance of [OrderService](https://github.com/ktbartholomew/tanstack-query-pubsub/blob/nextjs-websocket/src/server/order-service.ts) which emits events about random restaurant orders every few seconds.

```typescript
const orderService = new OrderService();

export function handleUpgrade(
req: IncomingMessage,
socket: internal.Duplex,
head: Buffer
) {
   wss.handleUpgrade(req, socket, head, (client: WebSocket) => {
      orderService.subscribe((order) => {
         client.send(
            JSON.stringify({
               event: "order-received",
               detail: {
               order,
               },
            })
         );
      });
   });
}
```

## Caveats

Just because you could, doesn't mean you should.

- It prevents you from deploying the app on serverless platforms like Vercel...you have to run the application in a container, server, or other always-on platform.
- It breaks Next.js performance features like [automatic static optimization](https://nextjs.org/docs/pages/building-your-application/rendering/automatic-static-optimization).
- It combines multiple responsibilities into a single unit; A front-end application and a real-time messaging service are probably things that are going to have different scaling and deployment needs. Combining them could be convenient if you would rather deploy a single service, but could be limiting as those services scale.

## Easter Eggs

1. The fake order service is inspired by the Expo printer in a kitchen that prints tickets for each order, telling the kitchen staff what they need to prepare. The menu is inspired by In-n-Out Burger.
1. I spent much more time than necessary styling the tickets to look realistic, including researching actual expo printers and kitchen conventions.
1. The background image was generated by prompting [DreamStudio by stability.ai](https://beta.dreamstudio.ai/generate)
1. I learned how to use [Framer Motion](https://www.framer.com/motion/) for this example because I thought it would be fun to see the order tickets "slide" down the rail.