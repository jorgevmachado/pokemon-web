# Pokemon Web

Next.js (App Router) project with login/register flow, alert component feedback, protected home route via auth cookie, and dynamic navbar/sidebar.

## Features

- Alert component with `info`, `warning`, `error`, and `success`
- Login page with email and password
- Register page with:
  - email
  - full name
  - birth date
  - gender
  - password and password confirmation
- Protected `home` route (`/home`) guarded by auth cookie token
- Dynamic navigation:
  - authenticated: navbar + sidebar menus
  - unauthenticated: navbar only

## Authentication Documentation

- Detailed auth architecture, login flow, loading behavior, and maintenance guide:
  - `app/ui/features/auth/README.md`

## Routes

- `/login`: login page
- `/register`: register page
- `/home`: protected page
- `/`: redirects to `/home` (authenticated) or `/login` (unauthenticated)

## Local Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run test
```
