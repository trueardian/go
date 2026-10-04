import { MODULES, GITHUB_URL } from "./modules.js";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/+/, "");

    const VANITY_DOMAIN = "go.naturallyfunny.dev";
    const NEW_DOMAIN = "trueardian.com";
    const NEW_VANITY_DOMAIN = `go.${NEW_DOMAIN}`;
    const CONTACT_EMAIL = `ardian@${NEW_DOMAIN}`;
    const MOVED_TO = path ? `${NEW_VANITY_DOMAIN}/${path}` : NEW_VANITY_DOMAIN;

    const segments = path ? path.split("/") : [];
    const moduleName = segments[0];
    const repoURL = MODULES[moduleName];

    if (url.searchParams.get("go-get") === "1") {
      if (!moduleName || !repoURL) {
        return new Response("module not found", { status: 404 });
      }

      const html = `<!DOCTYPE html>
<html>
  <head>
    <meta name="go-import" content="${VANITY_DOMAIN}/${moduleName} git ${repoURL}">
  </head>
  <body>go-import</body>
</html>`;

      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Moved to ${MOVED_TO}</title>
  <style>
    :root {
      --fg: #0a0a0a;
      --muted: #6b6b6b;
      --border: #e5e5e5;
      --bg: #ffffff;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--fg);
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      max-width: 480px;
      width: 100%;
      padding: 32px;
      text-align: center;
    }
    .title {
      font-size: 28px;
      font-weight: 600;
      line-height: 1.3;
      overflow-wrap: anywhere;
    }
    .title a {
      color: var(--fg);
    }
    .divider {
      height: 1px;
      background: var(--border);
      margin: 24px 0;
    }
    .contact {
      font-size: 13px;
      color: var(--muted);
    }
    .contact a {
      color: var(--fg);
      text-decoration: none;
    }
    .contact a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="title">Moved to <a href="https://${MOVED_TO}">${MOVED_TO}</a></div>
    <div class="divider"></div>
    <div class="contact">
      Contact:
      <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
    </div>
  </div>
</body>
</html>`;

    return new Response(html, {
      headers: { "Content-Type": "text/html" },
    });
  },
};
