import { NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { parseBlogPostPayload } from "@/lib/blog-posts";

export async function GET() {
  if (!(await isAdminRequest())) return unauthorized();

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ blogPosts: data ?? [] });
}

export async function POST(request: Request) {
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
    .insert(parsed.data)
    .select()
    .single();

  if (error) {
    // 23505 is "unique_violation" — the slug is already taken.
    const status = error.code === "23505" ? 409 : 500;
    const message =
      error.code === "23505" ? "That slug is already in use." : error.message;
    return NextResponse.json({ error: message }, { status });
  }
  return NextResponse.json({ blogPost: data }, { status: 201 });
}
