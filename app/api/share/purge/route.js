export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  getBucketFromPath,
  getPathWithoutBucket,
} from "@/lib/supabaseadmin";
import { sharePurgeSchema } from "@/lib/api/schemas";
import {
  handleApiError,
  parseJsonBody,
  requireAuthenticatedUser,
} from "@/lib/api/security";

function canManageLink(user, link) {
  return user?.roles === "admin" || link?.meta?.createdByEmail === user?.email;
}

export async function POST(req) {
  try {
    const auth = await requireAuthenticatedUser(req);
    if (auth.error) {
      return auth.error;
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { slug } = await parseJsonBody(req, sharePurgeSchema);

    const { data: link } = await supabaseAdmin
      .from("share_links")
      .select("id, meta")
      .eq("slug", slug)
      .maybeSingle();

    if (!link) {
      return NextResponse.json({ ok: true });
    }

    if (!canManageLink(auth.user, link)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const { data: files } = await supabaseAdmin
      .from("share_link_files")
      .select("storage_path")
      .eq("link_id", link.id);

    if (files?.length) {
      const filesByBucket = files.reduce((acc, file) => {
        const bucket = getBucketFromPath(file.storage_path);
        const pathInBucket = getPathWithoutBucket(file.storage_path);
        if (!acc[bucket]) acc[bucket] = [];
        acc[bucket].push(pathInBucket);
        return acc;
      }, {});

      for (const [bucket, paths] of Object.entries(filesByBucket)) {
        await supabaseAdmin.storage.from(bucket).remove(paths);
      }
    }

    await supabaseAdmin.from("share_link_files").delete().eq("link_id", link.id);
    await supabaseAdmin.from("share_links").delete().eq("id", link.id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error, "No se pudo eliminar el link compartido");
  }
}
