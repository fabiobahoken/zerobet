// Flood #general with 48 user messages via 8 parallel sockets
// (rate limit is 6 msgs / 15s PER socket.id — 8 sockets × 6 = 48 in ~2s).
import { io } from "socket.io-client";

const URL = "http://localhost:3003";
const MSGS_PER_SOCKET = 6;
const SOCKETS = 8;

function once(socket, event, timeoutMs = 4000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout " + event)), timeoutMs);
    socket.once(event, (data) => { clearTimeout(timer); resolve(data); });
  });
}

async function main() {
  const sockets = [];
  for (let i = 0; i < SOCKETS; i++) {
    const s = io(URL, { transports: ["websocket"] });
    await once(s, "connect");
    s.emit("join", { nickname: `FloodBot${i}`, room: "general", streakDays: 30 });
    sockets.push(s);
  }
  await new Promise((r) => setTimeout(r, 500));

  let sent = 0;
  for (let m = 0; m < MSGS_PER_SOCKET; m++) {
    for (let i = 0; i < SOCKETS; i++) {
      sockets[i].emit("message", {
        nickname: `FloodBot${i}`,
        content: `Message de contexte #${i}-${m} — soutien et motivation`,
        room: "general",
        color: "#2DD4BF",
      });
      sent++;
    }
    await new Promise((r) => setTimeout(r, 350));
  }
  console.log("SENT:", sent);
  for (const s of sockets) s.disconnect();
  process.exit(0);
}

main().catch((e) => { console.error("flood error", e); process.exit(1); });
