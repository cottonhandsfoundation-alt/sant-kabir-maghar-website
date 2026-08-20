"use client";

import { useState, useTransition } from "react";
import { toggleUserActive, updateUserRole } from "./actions";
import type { AdminRole } from "@/lib/auth";

const ROLES: { value: AdminRole; label: string }[] = [
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "CONTENT_MANAGER", label: "Content Manager" },
  { value: "DONATION_MANAGER", label: "Donation Manager" },
  { value: "EVENT_MANAGER", label: "Event Manager" },
];

export default function UserRowActions({
  userId,
  active,
  role,
  isSelf,
}: {
  userId: string;
  active: boolean;
  role: AdminRole;
  isSelf: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleToggle() {
    setError(null);
    startTransition(async () => {
      try {
        await toggleUserActive(userId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newRole = e.target.value;
    setError(null);
    startTransition(async () => {
      try {
        await updateUserRole(userId, newRole);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <select
          defaultValue={role}
          onChange={handleRoleChange}
          disabled={pending}
          className="rounded-sm border border-border bg-paper px-2 py-1 text-xs focus:border-saffron focus:outline-none"
        >
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleToggle}
          disabled={pending || (isSelf && active)}
          title={isSelf && active ? "You cannot deactivate your own account" : undefined}
          className={`rounded-sm border px-2 py-1 text-xs transition disabled:cursor-not-allowed disabled:opacity-50 ${
            active
              ? "border-border text-ink-soft hover:border-saffron hover:text-saffron"
              : "border-green text-green hover:bg-green/10"
          }`}
        >
          {active ? "Deactivate" : "Activate"}
        </button>
      </div>
      {error ? <p className="text-xs text-saffron-dark">{error}</p> : null}
    </div>
  );
}
