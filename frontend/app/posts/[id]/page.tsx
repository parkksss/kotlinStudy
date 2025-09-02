import Link from "next/link";
import { api } from "@/app/lib/api";
import { PostRes } from "@/app/types/post";

export default async function PostDetail({ params }: { params: { id: string }}) {
  const post = await api.get<PostRes>(`/posts/${params.id}`);
  return (
    <main className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">{post.title}</h1>
      <div className="text-sm text-gray-600 mb-4">{post.author} · {new Date(post.createdAt).toLocaleString()}</div>
      <pre className="whitespace-pre-wrap border p-3">{post.content}</pre>
      <div className="mt-4">
        <Link className="underline" href={`/posts/${post.id}/edit`}>수정</Link>
      </div>
    </main>
  );
}
