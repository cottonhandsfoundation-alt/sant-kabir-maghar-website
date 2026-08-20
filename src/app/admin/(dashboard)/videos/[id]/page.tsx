import { getAdminSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { VideoForm } from "../VideoForm";
import { updateVideo } from "../actions";

const ALLOWED_ROLES = ["SUPER_ADMIN", "CONTENT_MANAGER"];

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
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
  const video = await prisma.video.findUnique({ where: { id } });
  if (!video) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-ink">Edit Video</h1>
      <VideoForm action={updateVideo.bind(null, id)} defaultValues={video} />
    </div>
  );
}
