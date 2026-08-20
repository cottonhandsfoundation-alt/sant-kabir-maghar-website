import { getAdminSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { GalleryForm } from "../GalleryForm";
import { updateMediaAsset } from "../actions";

const ALLOWED_ROLES = ["SUPER_ADMIN", "CONTENT_MANAGER"];

export default async function EditMediaPage({ params }: { params: Promise<{ id: string }> }) {
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
  const [asset, events] = await Promise.all([
    prisma.mediaAsset.findUnique({ where: { id } }),
    prisma.event.findMany({ select: { id: true, titleEn: true }, orderBy: { startDate: "desc" } }),
  ]);
  if (!asset) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-ink">Edit Media</h1>
      <GalleryForm action={updateMediaAsset.bind(null, id)} defaultValues={asset} events={events} />
    </div>
  );
}
