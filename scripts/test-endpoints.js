const http = require("http");

const routes = [
  "/",
  "/api/v1/health",
  "/explore",
  "/sources",
  "/videos",
  "/introduction",
  "/tutor",
  "/topics/mathematics",
  "/lessons/baudhayana-sulba-sutras-geometry",
  "/legal/disclaimer",
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http
      .get(`http://localhost:3000${route}`, (res) => {
        resolve({ route, statusCode: res.statusCode });
      })
      .on("error", (err) => {
        resolve({ route, error: err.message });
      });
  });
}

async function run() {
  console.log("🔍 Checking all Phase 1 routes on http://localhost:3000...\n");
  for (const route of routes) {
    const res = await checkRoute(route);
    const statusMark = res.statusCode === 200 ? "✅ 200 OK" : `❌ ${res.statusCode || res.error}`;
    console.log(`${statusMark.padEnd(12)} http://localhost:3000${route}`);
  }
}

run();
