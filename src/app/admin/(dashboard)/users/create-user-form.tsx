"use client";

import { useActionState } from "react";
import { createAdminUser } from "./actions";

const ROLES = [
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "CONTENT_MANAGER", label: "Content Manager" },
  { value: "DONATION_MANAGER", label: "Donation Manager" },
  { value: "EVENT_MANAGER", label: "Event Manager" },
];

const inputClass =
  "w-full rounded-sm border border-border bg-paper px-3 py-2 text-sm focus:border-saffron focus:outline-none";

export default function CreateUserForm() {
  const [state, formAction, isPending] = useActionState(createAdminUser, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">
            Name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
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
            minLength={8}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="role" className="mb-1 block text-sm font-medium text-ink">
            Role
          </label>
          <select id="role" name="role" defaultValue="CONTENT_MANAGER" className={inputClass}>
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-sm bg-saffron px-4 py-2 text-sm font-medium text-cream transition hover:bg-saffron-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Creating…" : "Create admin user"}
        </button>
        {state?.success ? <span className="text-sm text-green">Admin user created.</span> : null}
        {state?.error ? <span className="text-sm text-saffron-dark">{state.error}</span> : null}
      </div>
    </form>
  );
}
