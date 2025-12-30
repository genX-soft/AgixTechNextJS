import { spawn } from "child_process";

const isProduction = process.env.NODE_ENV === "production";

const command = isProduction 
  ? ["next", "start", "-p", "5000"]
  : ["next", "dev", "-p", "5000"];

console.log(`Starting Next.js in ${isProduction ? "production" : "development"} mode...`);

const nextProcess = spawn("npx", command, {
  stdio: "inherit",
  shell: true,
  env: { ...process.env }
});

nextProcess.on("error", (err) => {
  console.error("Failed to start Next.js:", err);
  process.exit(1);
});

nextProcess.on("close", (code) => {
  process.exit(code ?? 0);
});

process.on("SIGINT", () => {
  nextProcess.kill("SIGINT");
});

process.on("SIGTERM", () => {
  nextProcess.kill("SIGTERM");
});
