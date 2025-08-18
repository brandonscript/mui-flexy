import { spawn } from "child_process";
import chokidar from "chokidar";
import fs from "fs";
import http from "http";
import path from "path";

const PORT = 3003;
const STATIC_DIR = "./static";

// MIME types
const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// Simple static file server
const server = http.createServer((req, res) => {
  let filePath = "." + req.url;

  if (filePath === "./") {
    filePath = "./index.html";
  }

  // Handle requests for packages directory from parent directory
  if (req.url.startsWith("/packages/")) {
    filePath = ".." + req.url;
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
  console.log(`📘 Docs server running at http://localhost:${PORT}`);
});

// Start rollup in watch mode
console.log("🔄 Starting rollup watch...");
const rollupProcess = spawn("npx", ["rollup", "-c", "../rollup.docs.mjs", "--watch"], {
  stdio: "inherit",
  shell: true,
});

// Watch for changes to the built file and log when it's updated
chokidar.watch(STATIC_DIR + "/docs.js").on("change", () => {
  console.log("🔄 Built file updated - refresh your browser!");
});

// Handle cleanup on exit
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down dev server...");
  rollupProcess.kill();
  server.close();
  process.exit(0);
});

rollupProcess.on("exit", (code) => {
  if (code !== 0) {
    console.error(`❌ Rollup process exited with code ${code}`);
  }
});
