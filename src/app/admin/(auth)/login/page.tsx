"use client";

import { useActionState } from "react";
import { adminLogin } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLogin, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-soft px-4">
      <div className="w-full max-w-sm rounded-sm border border-border bg-paper p-8 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold text-ink">Admin Login</h1>
        <p className="mb-6 text-sm text-ink-soft">
          Sant Kabir Sewa Samiti — content &amp; donation management
        </p>

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full rounded-sm border border-border bg-paper px-4 py-2.5 focus:border-saffron focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-sm border border-border bg-paper px-4 py-2.5 focus:border-saffron focus:outline-none"
            />
          </div>

          {state?.error ? (
            <p role="alert" className="rounded-sm bg-saffron-soft px-3 py-2 text-sm text-saffron-dark">
              {state.error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-sm bg-saffron px-4 py-2.5 font-medium text-cream transition hover:bg-saffron-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
