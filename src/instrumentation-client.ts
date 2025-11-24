import { initBotId } from "botid/client/core";

// Define the paths that need bot protection.
// These are API endpoints that should be protected from bots.
initBotId({
  protect: [
    {
      path: "/api/send",
      method: "POST",
    },
  ],
});

