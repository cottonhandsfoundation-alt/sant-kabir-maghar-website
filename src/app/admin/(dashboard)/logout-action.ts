"use server";

import { redirect } from "next/navigation";
import { destroyAdminSession } from "@/lib/auth";

export async function adminLogout() {
  "use server";
  await destroyAdminSession();
  redirect("/admin/login");
}
