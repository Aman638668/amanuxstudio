import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteSourceLocator } from "@metagptx/vite-plugin-source-locator";
import dotenv from "dotenv";

dotenv.config();

// Dev server middleware to execute /api serverless functions during local development
function apiDevPlugin() {
  return {
    name: "api-dev-server",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith("/api/discord-notify") && req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
              const handlerModule = await import("./api/discord-notify.js");
              const handler = handlerModule.default;
              
              res.status = (code: number) => {
                res.statusCode = code;
                return res;
              };
              res.json = (data: any) => {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
              };

              await handler(req, res);
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err.message || "Dev API error" }));
            }
          });
          return;
        }

        if (req.url && req.url.startsWith("/api/keepalive")) {
          try {
            const handlerModule = await import("./api/keepalive.js");
            const handler = handlerModule.default;
            res.status = (code: number) => {
              res.statusCode = code;
              return res;
            };
            res.json = (data: any) => {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(data));
            };
            await handler(req, res);
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [
    viteSourceLocator({
      prefix: "mgx",
    }),
    react(),
    apiDevPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
