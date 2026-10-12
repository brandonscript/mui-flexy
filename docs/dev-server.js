import { spawn } from "child_process";
import chokidar from "chokidar";
import fs from "fs";
import http from "http";
import { clearTimeout, setTimeout } from "node:timers";
import { URL } from "node:url";
import path from "path";

const PORT = 3003;
const BASEPATH = process.env.BASEPATH || "";

// MIME types
const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

console.log("🔄 Starting demo & docs server...");

// Simple static file server
const server = http.createServer((req, res) => {
  let url = new URL(req.url, "http://localhost").pathname;

  // Strip basepath from URL if present
  if (BASEPATH && url.startsWith(BASEPATH)) {
    url = url.slice(BASEPATH.length);
  }

  // Redirect root basepath requests to index.html
  if (BASEPATH && url === BASEPATH) {
    url = "/";
  }

  let filePath = "." + url;

  if (filePath === "./" || filePath === ".") {
    filePath = "./index.html";
  }

  // Handle requests for packages directory from parent directory
  if (url.startsWith("/packages/")) {
    filePath = ".." + url;
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404);
        res.end("File not found");
      } else {
        res.writeHead(500);
        res.end("Server error: " + error.code);
      }
    } else {
      res.writeHead(200, { "Content-Type": mimeType });
      res.end(content, "utf-8");
    }
  });
});

// Start server
server.listen(PORT, () => {
  const baseUrl = `http://localhost:${PORT}`;
  const fullUrl = BASEPATH ? `${baseUrl}${BASEPATH}` : baseUrl;
  console.log(`📘 Demo & docs server running at ${baseUrl}`);
  if (BASEPATH) {
    console.log(`🫜 Using basepath: ${fullUrl}`);
  }
});

// Poll source files so rebuilds also work on restricted or remote filesystems.
// The dev command has already completed the initial build before starting us.
let activeBuild;
let buildPending = false;
let shuttingDown = false;
let debounce;
const rebuild = () => {
  if (shuttingDown) return;
  if (activeBuild) {
    buildPending = true;
    return;
  }
  activeBuild = spawn("pnpm", ["exec", "rollup", "-c", "rollup.docs.mjs"], {
    stdio: "inherit",
    shell: false,
  });
  activeBuild.on("exit", (code) => {
    activeBuild = undefined;
    if (code !== 0) console.error(`Rollup exited with code ${code}`);
    else console.log("🔄 Built files updated - refresh your browser!");
    if (buildPending) {
      buildPending = false;
      rebuild();
    }
  });
};
const watcher = chokidar.watch(
  [
    "Docs.tsx",
    "rollup.docs.mjs",
    "index.template.html",
    "llms.txt",
    "../README.md",
    "../packages/*/src/**/*",
    "../packages/*/package.json",
    "../fixtures/v7/public/**/*",
  ],
  { usePolling: true, interval: 250, ignoreInitial: true },
);
watcher.on("all", () => {
  clearTimeout(debounce);
  debounce = setTimeout(rebuild, 150);
});

const shutdown = () => {
  shuttingDown = true;
  clearTimeout(debounce);
  activeBuild?.kill();
  watcher.close();
  server.close(() => process.exit(0));
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
