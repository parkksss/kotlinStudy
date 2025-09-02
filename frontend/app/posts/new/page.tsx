"use client";
import { useState } from "react";
import { api } from "@/app/lib/api";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const [title, setTitle] = useState(""); const [author, setAuthor] = useState("");
  const [content, setContent] = useState(""); const [err, setErr] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); setErr("");
    try {
      const res = await api.post<{id:number}>("/posts", { title, content, author });
      router.push(`/posts/${res.id}`);
    } catch (e: any) { setErr(e.message); }
  }

  return (
    <main className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">새 글</h1>
      {err && <p className="text-red-600 mb-2">{err}</p>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="border px-2 py-1 w-full" placeholder="제목" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="border px-2 py-1 w-full" placeholder="작성자" value={author} onChange={e=>setAuthor(e.target.value)} />
        <textarea className="border px-2 py-1 w-full h-48" placeholder="내용" value={content} onChange={e=>setContent(e.target.value)} />
        <button className="border px-3 py-1" type="submit">저장</button>
      </form>
    </main>
  );
}
