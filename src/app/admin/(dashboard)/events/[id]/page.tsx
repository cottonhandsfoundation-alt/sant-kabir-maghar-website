import { getAdminSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { EventForm } from "../EventForm";
import { updateEvent } from "../actions";

const ALLOWED_ROLES = ["SUPER_ADMIN", "EVENT_MANAGER"];

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (!ALLOWED_ROLES.includes(session.role)) {
    return (
      <div className="p-8">
        <p className="text-lg font-semibold">Access denied</p>
        <p className="text-sm text-ink-soft">
          Your role ({session.role}) does not have access to this section.
        </p>
      </div>
    );
  }

  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-ink">Edit Event</h1>
      <EventForm action={updateEvent.bind(null, id)} defaultValues={event} />
    </div>
  );
}
