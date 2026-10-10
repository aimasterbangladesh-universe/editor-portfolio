import { NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { parseBlogPostPayload } from "@/lib/blog-posts";

type RouteContext = { params: { id: string } };

export async function PUT(request: Request, { params }: RouteContext) {
  if (!(await isAdminRequest())) return unauthorized();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseBlogPostPayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .update(parsed.data)
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    // PGRST116 is "no rows returned" — the id does not exist.
    // 23505 is "unique_violation" — the slug is already taken.
    const status =
      error.code === "PGRST116" ? 404 : error.code === "23505" ? 409 : 500;
    const message =
      error.code === "23505" ? "That slug is already in use." : error.message;
    return NextResponse.json({ error: message }, { status });
  }
  return NextResponse.json({ blogPost: data });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!(await isAdminRequest())) return unauthorized();

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .delete()
    .eq("id", params.id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
