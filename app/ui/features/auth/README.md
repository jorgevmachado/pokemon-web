# Authentication Flow

This document explains how authentication works in the project, where the main files live, and how to maintain the current flow safely.

## High-level flow

The login sequence is intentionally split into three clear layers:

1. **UI form** — `app/ui/features/auth/LoginForm.tsx`
   - renders fields
   - performs client-side required-field validation
   - submits the form action
   - triggers feedback through `useAlert()`

2. **Server action** — `app/actions/auth.ts`
   - reads `FormData`
   - validates the login payload
   - calls `createAuthService().login(...)`
   - stores the auth cookie
   - redirects to `/home` on success
   - maps service errors into a user-facing `AuthActionState`

3. **Service layer** — `app/shared/services/auth-service/auth-service.ts`
   - calls the backend login endpoint (`auth/token`)
   - extracts the token from the backend response
   - returns a normalized token string to the action

## Main files

### UI
- `app/ui/features/auth/LoginForm.tsx`
- `app/ui/features/auth/RegisterForm.tsx`
- `app/ui/features/auth/AuthField.tsx`
- `app/ui/features/auth/AuthSubmitButton.tsx`

### Action
- `app/actions/auth.ts`

### Shared auth contracts
- `app/shared/lib/auth/action-state.ts`
- `app/shared/lib/auth/validation.ts`
- `app/shared/lib/auth/session.ts`

### Service layer
- `app/shared/services/auth-service/auth-service.ts`
- `app/shared/services/auth-service/create-auth-service.ts`
- `app/shared/services/auth-service/extract-auth-token.ts`
- `app/shared/services/auth-service/types.ts`

### Global providers
- `app/ui/providers/alert/AlertProvider.tsx`
- `app/ui/providers/loading/LoadingProvider.tsx`

## Where login happens

The real login request happens here:

- `app/actions/auth.ts` -> `loginAction`
- `loginAction` calls `createAuthService().login(credentials)`
- `AuthService.login(...)` performs `POST auth/token`

This keeps the login flow explicit and easy to trace:

`LoginForm` -> `loginAction` -> `AuthService.login` -> `setAuthCookie` -> `redirect('/home')`

## How loading is triggered

**IMPORTANT**: Loading is now managed at the form level, not in the submit button.

### The Problem (Fixed)
Previously, `AuthSubmitButton` was trying to synchronize loading using `useFormStatus()` and `useEffect()`, which caused an infinite loop:
1. Form is submitted → `pending=true` → button starts loading
2. Server action completes and redirects → component unmounts before `pending` can return to false
3. Loading never stops → infinite loop

### The Solution
Loading is now managed in the form component using the server action state:

1. **On form submission** (`handleSubmit`)
   - Form validates required fields
   - If valid, form calls `startPageLoading()`

2. **On server action completion** (via `useEffect` watching `state.message`)
   - When the server action finishes (success OR error), state changes
   - Form immediately calls `stopPageLoading()`
   - Alert is shown

This approach works because:
- The form **always receives the updated state** from the server action, even if redirecting
- Loading is stopped **before redirect happens** (on error) or **right as the component unmounts** (on success)
- The loading never gets stuck in a "pending" state

### Login flow example:
```
1. User fills form → clicks submit
2. LoginForm.handleSubmit → startPageLoading()
3. Form action sent to server
4. Server: loginAction → createAuthService().login(...) → setAuthCookie() → redirect('/home')
5. If ERROR: form receives state update → useEffect stops loading → alert shows error
6. If SUCCESS: redirect('/home') happens → page loads → loading naturally stops
```

## How alerts are triggered

Alerts are global and rendered once at app root by `AlertProvider`.

- forms call `showAlert(...)` from `useAlert()` for warning/error/success feedback
- no page-level duplicated alert containers are needed
- alerts auto-dismiss and can be dismissed manually

## Why this architecture is easier to maintain

- form owns **UI only**
- action owns **authentication orchestration**
- service owns **HTTP communication**
- loading and alerts are centralized in global providers
- shared auth contracts live outside the UI layer

This makes it easier to debug and change one layer without side effects in another.

## How to maintain or extend the auth flow

### If the backend login response changes
Update:
- `app/shared/services/auth-service/types.ts`
- `app/shared/services/auth-service/extract-auth-token.ts`

### If login validation rules change
Update:
- `app/actions/auth.ts`
- `app/shared/lib/auth/validation.ts`

### If loading behavior changes
Update:
- `app/ui/features/auth/LoginForm.tsx` → `handleSubmit()` and `useEffect()`
- `app/ui/features/auth/RegisterForm.tsx` → `useEffect()`
- `app/ui/providers/loading/*`

### If alert behavior changes
Update:
- `app/ui/providers/alert/*`
- `app/ui/components/alert/Alert.tsx`

### If login needs more fields
Update:
- `LoginForm.tsx`
- `SignInParams` in `app/shared/services/auth-service/types.ts`
- `readLoginPayload` and `validateLoginPayload` in `app/actions/auth.ts`

## Notes

- `RegisterForm` currently keeps its existing mock/success behavior.
- `loginAction` is the single entry point for login orchestration.
- Avoid importing UI-layer files into the server action layer.
