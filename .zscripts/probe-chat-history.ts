// Probe: does the running chat service replay history on join?
import { io } from "socket.io-client";

const URL = "http://localhost:3003";

function once(socket, event, timeoutMs = 3000) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), timeoutMs);
    socket.once(event, (data) => {
      clearTimeout(timer);
      resolve(data);
    });
  });
}

async function main() {
  // Sender: sends one message
  const sender = io(URL, { transports: ["websocket"] });
  await once(sender, "connect");
  sender.emit("join", { nickname: "HistProbeA", room: "general", streakDays: 10 });
  await new Promise((r) => setTimeout(r, 400));
  sender.emit("message", { nickname: "HistProbeA", content: "history-probe-xyz", room: "general", color: "#2DD4BF" });
  await new Promise((r) => setTimeout(r, 400));
  sender.disconnect();

  // Joiner: should receive `history` with the probe message if new code is live
  const joiner = io(URL, { transports: ["websocket"] });
  await once(joiner, "connect");
  const histPromise = once(joiner, "history", 2500);
  joiner.emit("join", { nickname: "HistProbeB", room: "general", streakDays: 10 });
  const hist = await histPromise;
  joiner.disconnect();

  if (!hist) {
    console.log("RESULT: OLD_CODE (no history event)");
  } else {
    const msgs = hist.messages || [];
    const found = msgs.some((m) => m.content === "history-probe-xyz");
    console.log("RESULT: NEW_CODE historyCount=" + msgs.length + " hasMore=" + hist.hasMore + " probeFound=" + found);
  }
  process.exit(0);
}

main().catch((e) => { console.error("probe error", e); process.exit(1); });
