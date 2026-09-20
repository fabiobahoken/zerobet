/**
 * QA probe — verifies the server-side chat rate limiter.
 *
 * Connects as "ProbeBot", joins #general and floods 8 messages quickly.
 * Expected: first 6 accepted (broadcasts), last 2 rejected with a
 * `rate-limited` event carrying retryAfterMs.
 *
 * Usage: bun /home/z/my-project/tests/rate-limit-probe.ts
 * (Run directly against the local mini-service, no gateway needed.)
 */
import { io } from "socket.io-client";

const URL = "http://localhost:3003";
const socket = io(URL, { transports: ["websocket"], forceNew: true });

let accepted = 0;
let rateLimited = 0;

socket.on("connect", () => {
  console.log("probe connected:", socket.id);
  socket.emit("join", {
    nickname: "ProbeBot",
    room: "general",
    streakDays: 0,
    color: "#FF9500",
  });

  setTimeout(() => {
    for (let i = 1; i <= 8; i++) {
      socket.emit("message", {
        nickname: "ProbeBot",
        content: `Probe flood ${i}`,
        room: "general",
        color: "#FF9500",
      });
    }
  }, 400);
});

socket.on("message", (msg: { nickname: string; content: string }) => {
  // The sender is excluded from broadcast since the duplicate-render fix,
  // so we should NOT receive our own messages back.
  if (msg.nickname === "ProbeBot") {
    accepted++;
    console.log("received own message (should NOT happen after fix):", msg.content);
  }
});

socket.on("rate-limited", (data: { retryAfterMs: number; scope: string }) => {
  rateLimited++;
  console.log(
    `rate-limited event #${rateLimited}: scope=${data.scope} retryAfterMs=${data.retryAfterMs}`
  );
});

setTimeout(() => {
  console.log("---- RESULT ----");
  console.log("own messages received back:", accepted, "(expect 0 after fix)");
  console.log("rate-limited events:", rateLimited, "(expect 2: sends 7 & 8)");
  socket.disconnect();
  process.exit(0);
}, 4000);
