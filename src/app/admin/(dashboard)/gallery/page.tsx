import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { ConfirmDeleteButton } from "../_shared/ConfirmDeleteButton";
import { deleteMediaAsset, toggleMediaAssetPublished } from "./actions";

const ALLOWED_ROLES = ["SUPER_ADMIN", "CONTENT_MANAGER"];

export default async function GalleryPage() {
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

  const assets = await prisma.mediaAsset.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink">Gallery</h1>
        <Link
          href="/admin/gallery/new"
          className="rounded-sm bg-saffron px-4 py-2 text-sm font-medium text-white"
        >
          + New Media
        </Link>
      </div>

      <div className="overflow-x-auto rounded-sm border border-border-soft bg-paper">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-ink-soft">
            <tr>
              <th className="px-3 py-2">Preview</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Published</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((row) => (
              <tr key={row.id} className="border-b border-border-soft">
                <td className="px-3 py-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={row.thumbnailUrl || row.url}
                    alt=""
                    className="h-12 w-12 rounded-sm object-cover"
                  />
                </td>
                <td className="px-3 py-2">
                  <span className="rounded-full bg-saffron-soft px-2 py-0.5 text-xs text-saffron-dark">
                    {row.type}
                  </span>
                </td>
                <td className="px-3 py-2 text-ink-soft">{row.category}</td>
                <td className="px-3 py-2">
                  <form action={toggleMediaAssetPublished.bind(null, row.id)}>
                    <button
                      type="submit"
                      className={`rounded-full px-2 py-0.5 text-xs text-white ${
                        row.published ? "bg-green" : "bg-ink-faint"
                      }`}
                    >
                      {row.published ? "Published" : "Draft"}
                    </button>
                  </form>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/gallery/${row.id}`}
                      className="rounded-sm border border-border px-2 py-1 text-xs font-medium text-ink-soft hover:border-saffron hover:text-saffron"
                    >
                      Edit
                    </Link>
                    <form action={deleteMediaAsset.bind(null, row.id)}>
                      <ConfirmDeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {assets.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-ink-faint">
                  No media yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
