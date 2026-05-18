# React & Node.js Full Folder Structures

Complete, production-ready folder layouts for React frontends and Node.js backends
inside a Turborepo monorepo. Use these as scaffolding blueprints — generate the exact
files shown for the user's chosen variant.

---

## React App Variants

> ⚠️ **Rule: default to webpack. Use Next.js only when the app is a landing page or needs SEO / SSR.**
>
> | Use Next.js | Use webpack |
> |---|---|
> | Landing page, marketing site, SEO-critical | Dashboard, admin panel, internal tool |
> | Public page needing server-side rendering | App behind login / no public crawlers |
> | Static site generation (`next export`) | SPA with client-only routing |
> | Full-stack with API route handlers in same app | API lives separately in `apps/api` |
> | User explicitly requests Next.js | Everything else |

| Variant | Framework | Build Tool | Best For |
|---|---|---|---|
| A | Next.js 14+ (App Router) | next build | Landing pages, SSR, SEO |
| D | React SPA — webpack `.js`/`.jsx` | webpack 5 + babel-loader | SPAs, dashboards, apps behind auth |
| E | React SPA — webpack `.ts`/`.tsx` | webpack 5 + ts-loader | TypeScript SPAs, dashboards |

---

## Variant A — Next.js App Router (TypeScript)

```
apps/web/
├── public/
│   ├── favicon.ico
│   └── images/
│       └── logo.svg
├── src/
│   ├── app/                        ← App Router root
│   │   ├── layout.tsx              ← Root layout (html, body)
│   │   ├── page.tsx                ← Home route  /
│   │   ├── globals.css
│   │   ├── (marketing)/            ← Route group — no URL segment
│   │   │   ├── about/
│   │   │   │   └── page.tsx        ← /about
│   │   │   └── pricing/
│   │   │       └── page.tsx        ← /pricing
│   │   ├── dashboard/
│   │   │   ├── layout.tsx          ← Dashboard shell layout
│   │   │   ├── page.tsx            ← /dashboard
│   │   │   └── settings/
│   │   │       └── page.tsx        ← /dashboard/settings
│   │   └── api/                    ← Route handlers
│   │       └── health/
│   │           └── route.ts        ← GET /api/health
│   ├── components/
│   │   ├── ui/                     ← Low-level UI (use @repo/ui instead if shared)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── index.ts
│   │   └── features/               ← Feature-scoped components
│   │       ├── auth/
│   │       │   ├── LoginForm.tsx
│   │       │   └── SignupForm.tsx
│   │       └── dashboard/
│   │           └── StatsCard.tsx
│   ├── lib/                        ← Pure utilities & helpers
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── validations.ts
│   ├── hooks/                      ← Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   ├── redux/                      ← Redux
│   │   ├── store.ts                ← configureStore + RootState / AppDispatch
│   │   ├── hooks.ts                ← typed useAppDispatch / useAppSelector
│   │   └── slice/                 ← one file per feature slice
│   │       ├── authSlice.ts        ← setCredentials, logout
│   │       ├── uiSlice.ts          ← toggleSidebar, setTheme
│   │       └── userSlice.ts        ← fetchUsers (createAsyncThunk)
│   ├── services/                   ← API call functions
│   │   ├── api.ts                  ← Base fetch/axios wrapper
│   │   ├── auth.service.ts
│   │   └── users.service.ts
│   └── types/                      ← App-local types (use @repo/types for shared)
│       ├── auth.types.ts
│       └── index.ts
├── .env.local                      ← Local env vars (gitignored)
├── .env.example                    ← Committed env template
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── package.json
```

### `apps/web/package.json`
```json
{
  "name": "web",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev":       "next dev --turbopack --port 3000",
    "build":     "next build",
    "start":     "next start",
    "lint":      "next lint",
    "typecheck": "tsc --noEmit",
    "clean":     "rm -rf .next out"
  },
  "dependencies": {
    "@repo/ui":    "*",
    "@repo/utils": "*",
    "@repo/types": "*",
    "next":        "^14.0.0",
    "react":       "^18.0.0",
    "react-dom":   "^18.0.0"
  },
  "devDependencies": {
    "@repo/config":          "*",
    "@types/react":          "^18.0.0",
    "@types/react-dom":      "^18.0.0",
    "@types/node":           "^20.0.0",
    "autoprefixer":          "^10.0.0",
    "postcss":               "^8.0.0",
    "tailwindcss":           "^3.0.0",
    "typescript":            "^5.0.0"
  }
}
```

### `apps/web/src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My App",
  description: "Built with Turborepo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### `apps/web/src/app/page.tsx`
```tsx
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Hello from web</h1>
    </main>
  );
}
```

---

## Node.js API Variants

| Variant | Framework | Best For |
|---|---|---|
| X | Express + TypeScript | REST APIs, quick services |
| Y | Fastify + TypeScript | High-perf APIs, plugins |
| Z | Express + JS (no build) | Simple scripts, lightweight |

---

## Variant X — Express REST API (TypeScript)

```
apps/api/
├── src/
│   ├── index.ts                    ← Entry — creates app & starts server
│   ├── app.ts                      ← Express app setup (no listen)
│   ├── config/
│   │   ├── env.ts                  ← Validated env vars (zod / dotenv)
│   │   └── database.ts             ← DB connection (Prisma / Mongoose / pg)
│   ├── routes/
│   │   ├── index.ts                ← Mounts all routers
│   │   ├── auth.routes.ts          ← /api/auth/*
│   │   ├── users.routes.ts         ← /api/users/*
│   │   └── health.routes.ts        ← /api/health
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── users.controller.ts
│   ├── services/
│   │   ├── auth.service.ts         ← Business logic
│   │   └── users.service.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts      ← JWT / session guard
│   │   ├── error.middleware.ts     ← Global error handler
│   │   ├── validate.middleware.ts  ← Request body validation
│   │   └── logger.middleware.ts
│   ├── models/                     ← DB models / Prisma schema lives at root
│   │   └── user.model.ts
│   ├── lib/
│   │   ├── logger.ts               ← Pino / Winston setup
│   │   ├── jwt.ts
│   │   └── hash.ts
│   └── types/
│       ├── express.d.ts            ← Augment Express Request type
│       └── index.ts
├── tests/
│   ├── integration/
│   │   └── auth.test.ts
│   └── unit/
│       └── users.service.test.ts
├── prisma/                         ← If using Prisma
│   └── schema.prisma
├── .env
├── .env.example
├── tsconfig.json
└── package.json
```

### `apps/api/package.json`
```json
{
  "name": "api",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev":       "tsx watch src/index.ts",
    "build":     "tsc -p tsconfig.json",
    "start":     "node dist/index.js",
    "test":      "vitest run",
    "lint":      "eslint src/",
    "typecheck": "tsc --noEmit",
    "db:migrate": "prisma migrate dev",
    "db:generate": "prisma generate",
    "clean":     "rm -rf dist"
  },
  "dependencies": {
    "@repo/types":   "*",
    "@repo/utils":   "*",
    "express":       "^4.18.0",
    "cors":          "^2.8.5",
    "helmet":        "^7.0.0",
    "zod":           "^3.0.0",
    "pino":          "^8.0.0",
    "jsonwebtoken":  "^9.0.0",
    "bcryptjs":      "^2.4.3"
  },
  "devDependencies": {
    "@repo/config":       "*",
    "@types/express":     "^4.17.0",
    "@types/cors":        "^2.8.0",
    "@types/node":        "^20.0.0",
    "@types/jsonwebtoken": "^9.0.0",
    "@types/bcryptjs":    "^2.4.0",
    "tsx":                "^4.0.0",
    "typescript":         "^5.0.0",
    "vitest":             "^1.0.0"
  }
}
```

### `apps/api/src/index.ts`
```ts
import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./lib/logger";

const server = app.listen(env.PORT, () => {
  logger.info(`API running on http://localhost:${env.PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");
  server.close(() => process.exit(0));
});
```

### `apps/api/src/app.ts`
```ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorMiddleware } from "./middleware/error.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { router } from "./routes";

export const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.use("/api", router);

app.use(errorMiddleware);
```

### `apps/api/src/routes/index.ts`
```ts
import { Router } from "express";
import { healthRouter } from "./health.routes";
import { authRouter }   from "./auth.routes";
import { usersRouter }  from "./users.routes";

export const router = Router();

router.use("/health", healthRouter);
router.use("/auth",   authRouter);
router.use("/users",  usersRouter);
```

### `apps/api/src/routes/health.routes.ts`
```ts
import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
```

### `apps/api/src/config/env.ts`
```ts
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV:    z.enum(["development", "test", "production"]).default("development"),
  PORT:        z.coerce.number().default(4000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET:  z.string().min(32),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
});

export const env = envSchema.parse(process.env);
```

### `apps/api/src/middleware/error.middleware.ts`
```ts
import type { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err);
  res.status(500).json({ error: err.message ?? "Internal Server Error" });
}
```

---

## Variant Y — Fastify API (TypeScript)

```
apps/api/
├── src/
│   ├── index.ts                    ← Entry
│   ├── server.ts                   ← Fastify instance + plugin registration
│   ├── config/
│   │   └── env.ts
│   ├── plugins/
│   │   ├── cors.ts                 ← @fastify/cors
│   │   ├── jwt.ts                  ← @fastify/jwt
│   │   └── sensible.ts             ← @fastify/sensible
│   ├── routes/
│   │   ├── health/
│   │   │   └── index.ts
│   │   ├── auth/
│   │   │   └── index.ts
│   │   └── users/
│   │       └── index.ts
│   ├── schemas/                    ← JSON Schema / Zod for request validation
│   │   └── user.schema.ts
│   ├── services/
│   │   └── users.service.ts
│   ├── hooks/                      ← Fastify lifecycle hooks
│   │   └── auth.hook.ts
│   └── types/
│       └── fastify.d.ts            ← Augment FastifyRequest
├── tests/
├── tsconfig.json
└── package.json
```

### `apps/api/package.json` (Fastify)
```json
{
  "name": "api",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev":   "tsx watch src/index.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/index.js",
    "test":  "vitest run",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@repo/types":       "*",
    "fastify":           "^4.0.0",
    "@fastify/cors":     "^8.0.0",
    "@fastify/jwt":      "^7.0.0",
    "@fastify/sensible": "^5.0.0",
    "zod":               "^3.0.0"
  },
  "devDependencies": {
    "@repo/config": "*",
    "@types/node":  "^20.0.0",
    "tsx":          "^4.0.0",
    "typescript":   "^5.0.0",
    "vitest":       "^1.0.0"
  }
}
```

---

## Variant Z — Express + Plain JS (No Build)

```
apps/api/
├── src/
│   ├── index.js                    ← Entry
│   ├── app.js                      ← Express setup
│   ├── config/
│   │   └── env.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   └── health.routes.js
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── services/
│   │   └── auth.service.js
│   ├── middleware/
│   │   └── error.middleware.js
│   └── lib/
│       └── logger.js
├── tests/
├── .env
├── .env.example
└── package.json
```

### `apps/api/package.json` (plain JS)
```json
{
  "name": "api",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "scripts": {
    "dev":   "node --watch src/index.js",
    "start": "node src/index.js",
    "build": "echo no build step",
    "test":  "node --experimental-vm-modules node_modules/.bin/jest",
    "lint":  "eslint src/",
    "clean": "echo ok"
  },
  "dependencies": {
    "@repo/utils": "*",
    "express":     "^4.18.0",
    "cors":        "^2.8.5",
    "helmet":      "^7.0.0"
  },
  "devDependencies": {
    "eslint": "^9.0.0"
  }
}
```

---

## Shared UI Package (`packages/ui`)

Used by both React apps. Full folder structure:

```
packages/ui/
├── src/
│   ├── index.ts                    ← Re-exports everything
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts
│   │   └── Badge/
│   │       ├── Badge.tsx
│   │       └── index.ts
│   ├── hooks/
│   │   ├── useClickOutside.ts
│   │   └── useMediaQuery.ts
│   └── styles/
│       ├── tokens.css              ← CSS custom properties
│       └── reset.css
├── storybook/                      ← Optional Storybook
│   └── stories/
│       └── Button.stories.tsx
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── turbo.json
```

---

## Shared Utils Package (`packages/utils`)

```
packages/utils/
├── src/
│   ├── index.ts                    ← Barrel export
│   ├── string.ts                   ← capitalize, slugify, truncate…
│   ├── date.ts                     ← formatDate, timeAgo, isExpired…
│   ├── array.ts                    ← chunk, unique, groupBy…
│   ├── object.ts                   ← omit, pick, deepMerge…
│   ├── validation.ts               ← isEmail, isUrl, isUUID…
│   └── http.ts                     ← createFetcher, buildUrl…
├── tests/
│   └── string.test.ts
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

---

## `.env.example` Template

Every app should commit an `.env.example`. Never commit `.env`.

### `apps/api/.env.example`
```bash
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
JWT_SECRET=change-me-to-at-least-32-random-chars
CORS_ORIGIN=http://localhost:3000
```

### `apps/web/.env.example`
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Full Combined Tree (React + Node in one Turbo repo)

```
my-monorepo/
├── apps/
│   ├── web/                        ← React app (Next.js or webpack SPA)
│   │   ├── src/
│   │   │   ├── app/  (Next.js)     OR  pages/ (webpack SPA)
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── redux/              ← store.ts + slice/
│   │   │   │   ├── store.ts
│   │   │   │   ├── hooks.ts
│   │   │   │   └── slice/
│   │   │   │       └── [feature]Slice.ts
│   │   │   └── types/
│   │   ├── public/
│   │   ├── .env.local
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api/                        ← Node.js API (Express or Fastify)
│       ├── src/
│       │   ├── index.ts
│       │   ├── app.ts
│       │   ├── config/
│       │   ├── routes/
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── middleware/
│       │   ├── lib/
│       │   └── types/
│       ├── tests/
│       ├── .env
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── ui/                         ← Shared React components
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsup.config.ts
│   │
│   ├── utils/                      ← Shared JS/TS utilities
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsup.config.ts
│   │
│   ├── types/                      ← Shared TypeScript types
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── config/                     ← Shared tsconfig, eslint
│       ├── tsconfig.base.json
│       ├── tsconfig.react.json
│       ├── tsconfig.node.json
│       └── package.json
│
├── turbo.json
├── package.json
├── .gitignore
└── README.md
```

---

## Webpack Setup — React & Node (JS and TS)

| App | Language | Config file | Transpiler |
|---|---|---|---|
| React SPA | `.js` / `.jsx` | `webpack.config.js` | `babel-loader` |
| React SPA | `.ts` / `.tsx` | `webpack.config.ts` | `ts-loader` |
| Node API  | `.js` / `.cjs` | `webpack.config.js` | `babel-loader` |
| Node API  | `.ts`          | `webpack.config.ts` | `ts-loader`  |

> For React SPAs, webpack is the build tool — the `src/` folder structure matches the layout used in Variant D/E. For Node, webpack bundles into a single `dist/server.js`, useful for Docker or Lambda.

---

## Variant D — React + Webpack (JavaScript `.js` / `.jsx`)

```
apps/web/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── redux/                      ← Redux
│   │   ├── store.js                ← configureStore root
│   │   ├── hooks.js                ← useAppDispatch / useAppSelector
│   │   └── slice/                 ← one file per feature
│   │       ├── authSlice.js
│   │       ├── uiSlice.js
│   │       └── userSlice.js
│   ├── lib/
│   └── types/
├── public/
│   ├── index.html
│   └── favicon.ico
├── webpack.config.js
├── babel.config.js
├── .browserslistrc
└── package.json
```

### `apps/web/package.json`
```json
{
  "name": "web",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev":   "webpack serve --mode development",
    "build": "webpack --mode production",
    "lint":  "eslint src/",
    "test":  "jest",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@repo/ui":              "*",
    "@repo/utils":           "*",
    "react":                 "^18.0.0",
    "react-dom":             "^18.0.0",
    "react-router-dom":      "^6.0.0",
    "@reduxjs/toolkit":      "^2.0.0",
    "react-redux":           "^9.0.0"
  },
  "devDependencies": {
    "@babel/core":             "^7.0.0",
    "@babel/preset-env":       "^7.0.0",
    "@babel/preset-react":     "^7.0.0",
    "babel-loader":            "^9.0.0",
    "css-loader":              "^6.0.0",
    "style-loader":            "^3.0.0",
    "html-webpack-plugin":     "^5.0.0",
    "mini-css-extract-plugin": "^2.0.0",
    "copy-webpack-plugin":     "^11.0.0",
    "webpack":                 "^5.0.0",
    "webpack-cli":             "^5.0.0",
    "webpack-dev-server":      "^4.0.0"
  }
}
```

### `apps/web/src/redux/store.js`
```js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import uiReducer   from "./slice/uiSlice";
import userReducer  from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui:   uiReducer,
    user: userReducer,
  },
});
```

### `apps/web/src/redux/hooks.js`
```js
import { useDispatch, useSelector } from "react-redux";

/** @returns {import("@reduxjs/toolkit").Dispatch} */
export const useAppDispatch = () => useDispatch();

/**
 * @template T
 * @param {(state: ReturnType<typeof import("./store").store.getState>) => T} selector
 */
export const useAppSelector = (selector) => useSelector(selector);
```

### `apps/web/src/redux/slice/authSlice.js`
```js
import { createSlice } from "@reduxjs/toolkit";

/** @type {{ user: object|null, token: string|null, loading: boolean }} */
const initialState = {
  user:    null,
  token:   null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user  = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user  = null;
      state.token = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
```

### `apps/web/src/redux/slice/uiSlice.js`
```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
  theme:       "light",   // "light" | "dark"
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { toggleSidebar, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
```

### `apps/web/src/redux/slice/userSlice.js`
```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("user/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending,   (state)          => { state.status = "loading"; })
      .addCase(fetchUsers.fulfilled, (state, action)  => { state.status = "succeeded"; state.list = action.payload; })
      .addCase(fetchUsers.rejected,  (state, action)  => { state.status = "failed";    state.error = action.payload; });
  },
});

export default userSlice.reducer;
```

### Wire store in `apps/web/src/main.jsx`
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

---
```

### `apps/web/babel.config.js`
```js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
};
```

### `apps/web/webpack.config.js`
```js
const path                 = require("path");
const HtmlWebpackPlugin    = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin    = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV !== "production";

/** @type {import('webpack').Configuration} */
module.exports = {
  mode:   isDev ? "development" : "production",
  target: "web",

  entry: "./src/main.jsx",

  output: {
    path:       require("path").resolve(__dirname, "dist"),
    filename:   isDev ? "js/[name].js" : "js/[name].[contenthash:8].js",
    publicPath: "/",
    clean:      true,
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@":           path.resolve(__dirname, "src"),
      "@repo/ui":    path.resolve(__dirname, "../../packages/ui/src"),
      "@repo/utils": path.resolve(__dirname, "../../packages/utils/src"),
    },
  },

  module: {
    rules: [
      // JS / JSX
      {
        test:    /\.[jt]sx?$/,
        exclude: /node_modules/,
        use:     "babel-loader",
      },
      // Plain CSS
      {
        test:    /\.css$/,
        exclude: /\.module\.css$/,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
      },
      // CSS Modules
      {
        test: /\.module\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader:  "css-loader",
            options: { modules: { localIdentName: "[name]__[local]--[hash:base64:5]" } },
          },
        ],
      },
      // Images & fonts
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: { filename: "assets/[name].[hash:8][ext]" },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html", favicon: "./public/favicon.ico" }),
    !isDev && new MiniCssExtractPlugin({ filename: "css/[name].[contenthash:8].css" }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: ".", globOptions: { ignore: ["**/index.html"] } }],
    }),
  ].filter(Boolean),

  devServer: {
    port:               3000,
    hot:                true,
    historyApiFallback: true,
    proxy: [{ context: ["/api"], target: "http://localhost:4000" }],
    static: { directory: path.join(__dirname, "public") },
  },

  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" },
      },
    },
  },

  devtool: isDev ? "eval-source-map" : "source-map",
};
```

### `apps/web/public/index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

## Variant E — React + Webpack (TypeScript `.ts` / `.tsx`)

```
apps/web/
├── src/
│   ├── main.tsx                ← entry — wraps <Provider store={store}>
│   ├── App.tsx
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── redux/                  ← Redux
│   │   ├── store.ts            ← configureStore + RootState / AppDispatch
│   │   ├── hooks.ts            ← typed useAppDispatch / useAppSelector
│   │   └── slice/             ← one file per feature slice
│   │       ├── authSlice.ts
│   │       ├── uiSlice.ts
│   │       └── userSlice.ts
│   ├── lib/
│   └── types/
├── public/
│   └── index.html
├── webpack.config.ts           ← typed config (parsed by ts-node)
├── tsconfig.json               ← app TS config
├── tsconfig.webpack.json       ← separate CJS tsconfig for webpack config file
└── package.json
```

### `apps/web/package.json`
```json
{
  "name": "web",
  "version": "0.0.1",
  "private": true,
  "ts-node": { "project": "tsconfig.webpack.json" },
  "scripts": {
    "dev":       "webpack serve --mode development",
    "build":     "webpack --mode production",
    "typecheck": "tsc --noEmit",
    "lint":      "eslint src/",
    "test":      "jest",
    "clean":     "rm -rf dist"
  },
  "dependencies": {
    "@repo/ui":           "*",
    "@repo/utils":        "*",
    "@repo/types":        "*",
    "react":              "^18.0.0",
    "react-dom":          "^18.0.0",
    "react-router-dom":   "^6.0.0",
    "@reduxjs/toolkit":   "^2.0.0",
    "react-redux":        "^9.0.0"
  },
  "devDependencies": {
    "@repo/config":              "*",
    "@types/react":              "^18.0.0",
    "@types/react-dom":          "^18.0.0",
    "@types/node":               "^20.0.0",
    "@types/webpack-dev-server": "^4.0.0",
    "css-loader":                "^6.0.0",
    "style-loader":              "^3.0.0",
    "html-webpack-plugin":       "^5.0.0",
    "mini-css-extract-plugin":   "^2.0.0",
    "ts-loader":                 "^9.0.0",
    "ts-node":                   "^10.0.0",
    "typescript":                "^5.0.0",
    "webpack":                   "^5.0.0",
    "webpack-cli":               "^5.0.0",
    "webpack-dev-server":        "^4.0.0"
  }
}
```

### `apps/web/src/redux/store.ts`
```ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import uiReducer   from "./slice/uiSlice";
import userReducer  from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui:   uiReducer,
    user: userReducer,
  },
});

// Infer types from the store itself
export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### `apps/web/src/redux/hooks.ts`
```ts
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch          = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### `apps/web/src/redux/slice/authSlice.ts`
```ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user:    { id: string; name: string; email: string } | null;
  token:   string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user:    null,
  token:   null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: AuthState["user"]; token: string }>) {
      state.user  = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user  = null;
      state.token = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
```

### `apps/web/src/redux/slice/uiSlice.ts`
```ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  sidebarOpen: boolean;
  theme:       "light" | "dark";
}

const initialState: UiState = { sidebarOpen: false, theme: "light" };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state)                              { state.sidebarOpen = !state.sidebarOpen; },
    setTheme(state, action: PayloadAction<UiState["theme"]>) { state.theme = action.payload; },
  },
});

export const { toggleSidebar, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
```

### `apps/web/src/redux/slice/userSlice.ts`
```ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User { id: string; name: string; email: string; }
interface UserState { list: User[]; status: "idle" | "loading" | "succeeded" | "failed"; error: string | null; }

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "user/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json() as Promise<User[]>;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { list: [], status: "idle", error: null } as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending,   (state)         => { state.status = "loading"; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.status = "succeeded"; state.list = action.payload; })
      .addCase(fetchUsers.rejected,  (state, action) => { state.status = "failed";    state.error = action.payload ?? null; });
  },
});

export default userSlice.reducer;
```

### Wire store in `apps/web/src/main.tsx`
```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```
```

### `apps/web/tsconfig.webpack.json`
```json
{
  "extends": "@repo/config/tsconfig.node.json",
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node"
  },
  "include": ["webpack.config.ts"]
}
```

### `apps/web/webpack.config.ts`
```ts
import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration as DevServerConfig } from "webpack-dev-server";

interface Config extends webpack.Configuration {
  devServer?: DevServerConfig;
}

const isDev = process.env.NODE_ENV !== "production";

const config: Config = {
  mode:   isDev ? "development" : "production",
  target: "web",

  entry: "./src/main.tsx",

  output: {
    path:       path.resolve(__dirname, "dist"),
    filename:   isDev ? "js/[name].js" : "js/[name].[contenthash:8].js",
    publicPath: "/",
    clean:      true,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@":           path.resolve(__dirname, "src"),
      "@repo/ui":    path.resolve(__dirname, "../../packages/ui/src"),
      "@repo/utils": path.resolve(__dirname, "../../packages/utils/src"),
    },
  },

  module: {
    rules: [
      // TypeScript / TSX — transpileOnly for speed; typecheck runs separately
      {
        test:    /\.tsx?$/,
        exclude: /node_modules/,
        use: { loader: "ts-loader", options: { transpileOnly: true, configFile: "tsconfig.json" } },
      },
      // Plain CSS
      {
        test:    /\.css$/,
        exclude: /\.module\.css$/,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
      },
      // CSS Modules
      {
        test: /\.module\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader:  "css-loader",
            options: {
              modules: {
                localIdentName:         "[name]__[local]--[hash:base64:5]",
                exportLocalsConvention: "camelCase",
              },
            },
          },
        ],
      },
      // Assets
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: { filename: "assets/[name].[hash:8][ext]" },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    ...(isDev ? [] : [new MiniCssExtractPlugin({ filename: "css/[name].[contenthash:8].css" })]),
  ],

  devServer: {
    port:               3000,
    hot:                true,
    historyApiFallback: true,
    proxy: [{ context: ["/api"], target: "http://localhost:4000" }],
  },

  optimization: {
    splitChunks: { chunks: "all" },
    runtimeChunk: "single",
  },

  devtool: isDev ? "eval-source-map" : "source-map",
};

export default config;
```

### `apps/web/tsconfig.json`
```json
{
  "extends": "@repo/config/tsconfig.react.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*":           ["src/*"],
      "@repo/ui/*":    ["../../packages/ui/src/*"],
      "@repo/utils/*": ["../../packages/utils/src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Node + Webpack (JavaScript `.js`)

Bundles server into a single `dist/server.js` — ideal for Docker / Lambda deployments.

```
apps/api/
├── src/                        ← same Express structure (Variant X / Z)
├── webpack.config.js
├── babel.config.js
└── package.json
```

### `apps/api/package.json`
```json
{
  "name": "api",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev":   "webpack --mode development --watch",
    "build": "webpack --mode production",
    "start": "node dist/server.js",
    "lint":  "eslint src/",
    "test":  "jest",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@repo/utils": "*",
    "express":     "^4.18.0",
    "cors":        "^2.8.5",
    "helmet":      "^7.0.0"
  },
  "devDependencies": {
    "@babel/core":            "^7.0.0",
    "@babel/preset-env":      "^7.0.0",
    "babel-loader":           "^9.0.0",
    "webpack":                "^5.0.0",
    "webpack-cli":            "^5.0.0",
    "webpack-node-externals": "^3.0.0"
  }
}
```

### `apps/api/babel.config.js`
```js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
  ],
};
```

### `apps/api/webpack.config.js`
```js
const path          = require("path");
const nodeExternals = require("webpack-node-externals");

const isDev = process.env.NODE_ENV !== "production";

/** @type {import('webpack').Configuration} */
module.exports = {
  mode:   isDev ? "development" : "production",
  target: "node",                       // ← never bundle Node built-ins

  entry:  "./src/index.js",

  output: {
    path:     path.resolve(__dirname, "dist"),
    filename: "server.js",
    clean:    true,
  },

  externals: [nodeExternals()],         // keeps node_modules out of bundle

  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@repo/utils": path.resolve(__dirname, "../../packages/utils/src"),
    },
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
    ],
  },

  node: { __dirname: false, __filename: false },

  devtool: isDev ? "eval-source-map" : "source-map",
};
```

---

## Node + Webpack (TypeScript `.ts`)

```
apps/api/
├── src/                        ← same Express/Fastify TS structure
├── webpack.config.ts
├── tsconfig.json
├── tsconfig.webpack.json
└── package.json
```

### `apps/api/package.json`
```json
{
  "name": "api",
  "version": "0.0.1",
  "private": true,
  "ts-node": { "project": "tsconfig.webpack.json" },
  "scripts": {
    "dev":       "webpack --mode development --watch",
    "build":     "webpack --mode production",
    "start":     "node dist/server.js",
    "typecheck": "tsc --noEmit",
    "lint":      "eslint src/",
    "test":      "jest",
    "clean":     "rm -rf dist"
  },
  "dependencies": {
    "@repo/types": "*",
    "@repo/utils": "*",
    "express":     "^4.18.0",
    "cors":        "^2.8.5",
    "helmet":      "^7.0.0",
    "zod":         "^3.0.0"
  },
  "devDependencies": {
    "@repo/config":           "*",
    "@types/express":         "^4.17.0",
    "@types/cors":            "^2.8.0",
    "@types/node":            "^20.0.0",
    "ts-loader":              "^9.0.0",
    "ts-node":                "^10.0.0",
    "typescript":             "^5.0.0",
    "webpack":                "^5.0.0",
    "webpack-cli":            "^5.0.0",
    "webpack-node-externals": "^3.0.0"
  }
}
```

### `apps/api/tsconfig.webpack.json`
```json
{
  "extends": "@repo/config/tsconfig.node.json",
  "compilerOptions": { "module": "commonjs", "moduleResolution": "node" },
  "include": ["webpack.config.ts"]
}
```

### `apps/api/webpack.config.ts`
```ts
import path from "path";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";

const isDev = process.env.NODE_ENV !== "production";

const config: webpack.Configuration = {
  mode:   isDev ? "development" : "production",
  target: "node",

  entry: "./src/index.ts",

  output: {
    path:     path.resolve(__dirname, "dist"),
    filename: "server.js",
    clean:    true,
  },

  externals: [nodeExternals() as webpack.ExternalsPlugin],

  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      "@repo/types": path.resolve(__dirname, "../../packages/types/src"),
      "@repo/utils": path.resolve(__dirname, "../../packages/utils/src"),
    },
  },

  module: {
    rules: [
      {
        test:    /\.tsx?$/,
        exclude: /node_modules/,
        use: { loader: "ts-loader", options: { transpileOnly: true, configFile: "tsconfig.json" } },
      },
    ],
  },

  node: { __dirname: false, __filename: false },

  devtool: isDev ? "eval-source-map" : "source-map",
};

export default config;
```

### `apps/api/tsconfig.json`
```json
{
  "extends": "@repo/config/tsconfig.node.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "baseUrl": ".",
    "paths": {
      "@repo/types/*": ["../../packages/types/src/*"],
      "@repo/utils/*": ["../../packages/utils/src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

---

## `turbo.json` for Webpack Apps

```jsonc
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": [
        "src/**", "public/**",
        "webpack.config.*", "babel.config.*",
        "tsconfig*.json", "package.json"
      ],
      "outputs": ["dist/**"]
    },
    "dev": { "cache": false, "persistent": true },
    "typecheck": {
      "dependsOn": ["^build"],
      "inputs": ["src/**/*.{ts,tsx}", "tsconfig.json"]
    }
  }
}
```

---

## Common Webpack + Turbo Pitfalls

| Problem | Fix |
|---|---|
| `webpack.config.ts` fails to parse | Add `ts-node` devDep + `"ts-node": { "project": "tsconfig.webpack.json" }` in `package.json` |
| Internal package changes not reflected | Point webpack `alias` to `src/`, not `dist/` |
| `__dirname` is wrong in Node bundle | Set `node: { __dirname: false }` in webpack config |
| Large Node bundle | Always use `webpack-node-externals` for server builds |
| Shared packages not resolving | Add all internal packages to `resolve.alias` |
| Hot reload not working | `hot: true` + `historyApiFallback: true` in `devServer`; `webpack --watch` for Node |
| CSS class name conflicts | Use `.module.css` with `localIdentName` |
| Production build too slow | `transpileOnly: true` in `ts-loader` + separate `typecheck` Turbo task |

---

## Global Preview System — Single Port, Production Build, .env Controlled

Adds `pnpm preview` to the root. It builds everything, starts all apps as background
processes, then runs a single reverse-proxy on one port defined in `.env`.
`pnpm preview:stop` kills every background process cleanly.

---

### Root-level `.env` (committed as `.env.example`, gitignored as `.env`)

```
# .env  (root of monorepo — loaded by all preview scripts)

# Single public-facing port the proxy listens on
PORT=8080

# Public path prefix (set to /myapp/ if served under a subpath, else /)
PUBLIC_PATH=/

# Internal ports — each app binds to its own; proxy routes to them
WEB_PORT=3001
API_PORT=4000

# Base URL the React app uses for all API calls
API_BASE_URL=http://localhost:4000

# Node environment for production preview
NODE_ENV=production
```

### Root-level `.env.example`
```
PORT=8080
PUBLIC_PATH=/
WEB_PORT=3001
API_PORT=4000
API_BASE_URL=http://localhost:4000
NODE_ENV=production
```

Add to root `.gitignore`:
```
.env
.preview.pids
```

---

### Root `package.json` — preview scripts

```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev":           "turbo run dev",
    "build":         "turbo run build",
    "test":          "turbo run test",
    "lint":          "turbo run lint",
    "clean":         "turbo run clean",

    "preview":       "turbo run build && node scripts/preview-start.js",
    "preview:stop":  "node scripts/preview-stop.js"
  },
  "devDependencies": {
    "turbo":                  "latest",
    "dotenv":                 "^16.0.0",
    "express":                "^4.18.0",
    "http-proxy-middleware":  "^3.0.0",
    "cross-env":              "^7.0.0"
  }
}
```

---

### `scripts/preview-start.js`

Reads root `.env`, starts each app's production server as a background child process,
writes PIDs to `.preview.pids`, then starts the reverse proxy.

```js
// scripts/preview-start.js
const { spawn }     = require("child_process");
const path          = require("path");
const fs            = require("fs");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const PORT        = process.env.PORT        || 8080;
const WEB_PORT    = process.env.WEB_PORT    || 3001;
const API_PORT    = process.env.API_PORT    || 4000;
const PUBLIC_PATH = process.env.PUBLIC_PATH || "/";
const NODE_ENV    = "production";

const ROOT   = path.resolve(__dirname, "..");
const pidFile = path.join(ROOT, ".preview.pids");
const pids    = [];

function startProcess(label, cmd, args, cwd, env = {}) {
  const proc = spawn(cmd, args, {
    cwd,
    env:   { ...process.env, ...env, NODE_ENV },
    stdio: "inherit",
    shell: process.platform === "win32",
    detached: false,
  });
  pids.push(proc.pid);
  console.log(`[preview] ${label} started  (pid ${proc.pid})`);

  proc.on("error", (err) => console.error(`[preview] ${label} error:`, err.message));
  proc.on("exit",  (code) => {
    if (code !== 0) console.error(`[preview] ${label} exited with code ${code}`);
  });
  return proc;
}

// ── 1. Start React (web) production server ──────────────────────────────────
// webpack-generated dist is served via a tiny static express in the proxy,
// so web does not need its own server — skip or add if using next start.

// ── 2. Start Next.js if apps/web is Next.js (comment out if webpack SPA) ───
// startProcess("web", "node_modules/.bin/next", ["start", "--port", WEB_PORT],
//   path.join(ROOT, "apps/web"), { PORT: WEB_PORT });

// ── 3. Start API ────────────────────────────────────────────────────────────
startProcess(
  "api",
  "node",
  ["dist/server.js"],
  path.join(ROOT, "apps/api"),
  { PORT: API_PORT }
);

// ── 4. Write PIDs so preview:stop can kill them ─────────────────────────────
fs.writeFileSync(pidFile, pids.join("\n") + "\n");

// ── 5. Start reverse proxy (blocks — keep at bottom) ────────────────────────
console.log(`\n[preview] Proxy → http://localhost:${PORT}${PUBLIC_PATH}\n`);
require("./proxy.js");
```

---

### `scripts/proxy.js`

Single express server on `PORT`. Routes `/api/*` → API, static `dist/` → React SPA.
`PUBLIC_PATH` is the path prefix (e.g. `/` or `/myapp/`).

```js
// scripts/proxy.js
const express             = require("express");
const path                = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const PORT        = parseInt(process.env.PORT        || "8080", 10);
const API_PORT    = parseInt(process.env.API_PORT    || "4000",  10);
const PUBLIC_PATH = (process.env.PUBLIC_PATH         || "/").replace(/\/$/, "") || "/";

const app     = express();
const webDist = path.resolve(__dirname, "../apps/web/dist");

// ── /api/* → Node API ────────────────────────────────────────────────────────
app.use(
  `${PUBLIC_PATH}/api`,
  createProxyMiddleware({
    target:      `http://localhost:${API_PORT}`,
    changeOrigin: true,
    pathRewrite: { [`^${PUBLIC_PATH}/api`]: "/api" },
    on: {
      error: (err, req, res) => {
        console.error("[proxy] API error:", err.message);
        res.status(502).json({ error: "API unavailable" });
      },
    },
  })
);

// ── Static React SPA dist ────────────────────────────────────────────────────
app.use(PUBLIC_PATH, express.static(webDist));

// ── SPA fallback — send index.html for all unmatched routes ─────────────────
app.get(`${PUBLIC_PATH}/*`, (_req, res) => {
  res.sendFile(path.join(webDist, "index.html"));
});

// ── Root redirect if PUBLIC_PATH is a subpath ────────────────────────────────
if (PUBLIC_PATH !== "/") {
  app.get("/", (_req, res) => res.redirect(PUBLIC_PATH));
}

app.listen(PORT, () => {
  console.log(`[proxy] http://localhost:${PORT}${PUBLIC_PATH}`);
  console.log(`[proxy] /api/* → http://localhost:${API_PORT}`);
});
```

---

### `scripts/preview-stop.js`

Reads `.preview.pids` and kills every process. Also kills by port as a fallback.

```js
// scripts/preview-stop.js
const fs   = require("fs");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const pidFile = path.join(__dirname, "../.preview.pids");
const PORT     = process.env.PORT     || 8080;
const API_PORT = process.env.API_PORT || 4000;
const WEB_PORT = process.env.WEB_PORT || 3001;

// ── Kill by PID file ─────────────────────────────────────────────────────────
if (fs.existsSync(pidFile)) {
  const pids = fs.readFileSync(pidFile, "utf8")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  for (const pid of pids) {
    try {
      process.kill(parseInt(pid, 10), "SIGTERM");
      console.log(`[preview:stop] Killed pid ${pid}`);
    } catch {
      console.warn(`[preview:stop] pid ${pid} already gone`);
    }
  }
  fs.unlinkSync(pidFile);
}

// ── Kill by port (fallback for any orphaned processes) ───────────────────────
function killPort(port) {
  const { execSync } = require("child_process");
  try {
    if (process.platform === "win32") {
      const result = execSync(
        `netstat -ano | findstr :${port}`, { encoding: "utf8" }
      );
      const match = result.match(/\s+(\d+)\s*$/m);
      if (match) execSync(`taskkill /PID ${match[1]} /F`);
    } else {
      execSync(`lsof -ti tcp:${port} | xargs kill -9 2>/dev/null || true`);
    }
    console.log(`[preview:stop] Cleared port ${port}`);
  } catch {
    // port was already free
  }
}

[PORT, API_PORT, WEB_PORT].forEach(killPort);
console.log("[preview:stop] Done.");
```

---

### Fix: `PUBLIC_PATH` in webpack configs

Pass `PUBLIC_PATH` from `.env` into webpack's `output.publicPath` so asset URLs
are correct when the app is served under a subpath.

#### `apps/web/webpack.config.js`
```js
require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

module.exports = {
  // ...
  output: {
    path:       require("path").resolve(__dirname, "dist"),
    filename:   isDev ? "js/[name].js" : "js/[name].[contenthash:8].js",
    publicPath: process.env.PUBLIC_PATH || "/",   // ← from root .env
    clean:      true,
  },
  // ...
};
```

#### `apps/web/webpack.config.ts`
```ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const config: Config = {
  // ...
  output: {
    path:       path.resolve(__dirname, "dist"),
    filename:   isDev ? "js/[name].js" : "js/[name].[contenthash:8].js",
    publicPath: process.env.PUBLIC_PATH ?? "/",   // ← from root .env
    clean:      true,
  },
  // ...
};
```

Add `dotenv` to devDependencies if not already present:
```json
{ "devDependencies": { "dotenv": "^16.0.0" } }
```

---

### Fix: API base path in React apps

All API calls must use the base URL from the environment so they work both in dev
(proxied by webpack devServer) and in production preview (proxied by `proxy.js`).

#### `packages/utils/src/http.ts` (or `.js`) — shared API fetcher

```ts
// Read from webpack DefinePlugin-injected constant or fall back to relative /api
const API_BASE: string =
  typeof __API_BASE_URL__ !== "undefined"
    ? __API_BASE_URL__          // injected by webpack at build time
    : "/api";                   // relative — works via any proxy

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

// Usage:
// import { apiFetch } from "@repo/utils";
// const users = await apiFetch<User[]>("/users");
```

#### Inject `__API_BASE_URL__` via webpack `DefinePlugin`

Add to **both** `webpack.config.js` and `webpack.config.ts`:

```js
// webpack.config.js
const webpack = require("webpack");
require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });

module.exports = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      __API_BASE_URL__: JSON.stringify(
        isDev
          ? "/api"                                  // dev: proxied by devServer
          : process.env.API_BASE_URL || "/api"      // prod: from root .env
      ),
    }),
    // ...existing plugins
  ],
};
```

```ts
// webpack.config.ts  (add inside plugins array)
new webpack.DefinePlugin({
  __API_BASE_URL__: JSON.stringify(
    isDev
      ? "/api"
      : process.env.API_BASE_URL ?? "/api"
  ),
}),
```

Add the global type declaration so TypeScript doesn't complain:

#### `apps/web/src/types/globals.d.ts`
```ts
declare const __API_BASE_URL__: string;
```

#### Dev server proxy stays correct — no change needed

```js
// webpack.config.js devServer (already present)
devServer: {
  proxy: [{ context: ["/api"], target: "http://localhost:4000" }],
}
```

In dev, `apiFetch("/users")` → `/api/users` → proxied to `http://localhost:4000/api/users`.
In production preview, same path → `proxy.js` → `http://localhost:4000/api/users`.

---

### Fix: API `basePath` in Express (`apps/api`)

The API must be mounted on `/api` so all routes are prefixed correctly:

```ts
// apps/api/src/app.ts
app.use("/api", router);   // ← all routes: /api/health, /api/users, etc.
```

And in production `proxy.js`, the rewrite strips the duplicate:
```js
pathRewrite: { [`^${PUBLIC_PATH}/api`]: "/api" }
```

So:
- Browser → `GET /api/users`
- Proxy → `GET http://localhost:4000/api/users`
- Express → matches `/api` prefix → route `/users`

---

### Summary — `scripts/` folder at monorepo root

```
scripts/
├── preview-start.js   ← builds then starts all apps in background + proxy
├── preview-stop.js    ← kills all preview processes and frees ports
└── proxy.js           ← single-port reverse proxy (serves web + /api)
```

### Summary — root-level files added

```
my-monorepo/
├── .env               ← PORT, PUBLIC_PATH, API_PORT, API_BASE_URL (gitignored)
├── .env.example       ← committed template
├── scripts/
│   ├── preview-start.js
│   ├── preview-stop.js
│   └── proxy.js
└── package.json       ← "preview" + "preview:stop" scripts
```

### Flow

```
pnpm preview
  └── turbo run build          (all packages built in dependency order)
  └── preview-start.js
        ├── starts api          background, port API_PORT
        ├── writes .preview.pids
        └── starts proxy.js     foreground, port PORT
              ├── GET /api/* → http://localhost:API_PORT
              └── GET /*     → apps/web/dist (SPA fallback)

pnpm preview:stop
  └── preview-stop.js
        ├── kills pids from .preview.pids
        └── kills by port: PORT, API_PORT, WEB_PORT (fallback)
```
