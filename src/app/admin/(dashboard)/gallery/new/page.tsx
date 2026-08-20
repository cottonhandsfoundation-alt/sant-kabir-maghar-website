import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { GalleryForm } from "../GalleryForm";
import { createMediaAsset } from "../actions";

const ALLOWED_ROLES = ["SUPER_ADMIN", "CONTENT_MANAGER"];

export default async function NewMediaPage() {
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

  const events = await prisma.event.findMany({
    select: { id: true, titleEn: true },
    orderBy: { startDate: "desc" },
  });

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-ink">New Media</h1>
      <GalleryForm action={createMediaAsset} events={events} />
    </div>
  );
}
