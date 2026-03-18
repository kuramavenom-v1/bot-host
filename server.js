import express from "express";
import { exec } from "child_process";

const app = express();

let botProcess = null;

app.get("/start", (req, res) => {
  if (botProcess) return res.send("البوت شغال");

  botProcess = exec("node bot.js");

  botProcess.stdout.on("data", (data) => {
    console.log("BOT:", data);
  });

  res.send("تم تشغيل البوت");
});

app.get("/stop", (req, res) => {
  if (!botProcess) return res.send("مافي بوت");

  botProcess.kill();
  botProcess = null;

  res.send("تم إيقاف البوت");
});

app.get("/", (req, res) => {
  res.send("Bot Host Running 🔥");
});

app.listen(3000, () => console.log("Server started"));
