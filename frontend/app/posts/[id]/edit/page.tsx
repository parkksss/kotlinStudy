"use client";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/api";
import { useRouter, useParams } from "next/navigation";
import type { PostRes } from "@/app/types/post";

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<PostRes | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get<PostRes>(`/posts/${id}`).then(setPost).catch(e=>setErr(String(e)));
  }, [id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!post) return;
    try {
      await api.put(`/posts/${id}`, { title: post.title, content: post.content });
      router.push(`/posts/${id}`);
    } catch (e: any) { setErr(e.message); }
  }

  async function onDelete() {
    try {
      await api.del(`/posts/${id}`);
      router.push(`/posts`);
    } catch (e: any) { setErr(e.message); }
  }

  if (!post) return <main className="p-6">로딩중… {err && <span className="text-red-600">{err}</span>}</main>;
  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">수정</h1>
      {err && <p className="text-red-600 mb-2">{err}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="border px-2 py-1 w-full" value={post.title} onChange={e=>setPost({...post, title: e.target.value})} />
        <textarea className="border px-2 py-1 w-full h-48" value={post.content} onChange={e=>setPost({...post, content: e.target.value})} />
        <div className="flex gap-2">
          <button className="border px-3 py-1" type="submit">저장</button>
          <button className="border px-3 py-1" type="button" onClick={onDelete}>삭제</button>
        </div>
      </form>
    </main>
  );
}
