import { spawn } from "child_process";
import { build as esbuild } from "esbuild";
import { readFile } from "fs/promises";

async function buildAll() {
  console.log("Building Next.js application with Turbopack...");
  
  // Build Next.js app using Turbopack (default in Next.js 16)
  await new Promise<void>((resolve, reject) => {
    const nextBuild = spawn("npx", ["next", "build"], {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, NODE_ENV: "production" }
    });

    nextBuild.on("error", (err) => {
      reject(err);
    });

    nextBuild.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Next.js build failed with code ${code}`));
      }
    });
  });

  console.log("Building server entry point...");
  
  // Bundle the server entry point
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: allDeps,
    logLevel: "info",
  });

  console.log("Build completed successfully!");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
