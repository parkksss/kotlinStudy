import Link from "next/link";
import { api } from "@/app/lib/api";
import { PageRes, PostRes } from "@/app/types/post";

export const dynamic = "force-dynamic";

export default async function PostsPage({ searchParams }: {
  searchParams?: { page?: string; size?: string; keyword?: string }
}) {
  const page = Number(searchParams?.page ?? 0);
  const size = Number(searchParams?.size ?? 10);
  const keyword = searchParams?.keyword ?? "";

  const q = new URLSearchParams({ page: String(page), size: String(size) });
  if (keyword) q.set("keyword", keyword);

  const data = await api.get<PageRes<PostRes>>(`/posts?${q.toString()}`);

  return (
    <main className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">게시글</h1>
        <Link className="underline" href="/posts/new">새 글</Link>
      </div>
      <form className="mb-4" action="/posts">
        <input className="border px-2 py-1 mr-2" name="keyword" placeholder="검색" defaultValue={keyword}/>
        <button className="border px-3 py-1" type="submit">검색</button>
      </form>
      <ul className="space-y-3">
        {data.content.map(p => (
          <li key={p.id} className="border p-3">
            <div className="font-semibold"><Link href={`/posts/${p.id}`}>{p.title}</Link></div>
            <div className="text-sm text-gray-600">{p.author} · {new Date(p.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-2">
        {page > 0 && <Link className="underline" href={`/posts?page=${page-1}&size=${size}&keyword=${keyword}`}>이전</Link>}
        {page+1 < data.totalPages && <Link className="underline" href={`/posts?page=${page+1}&size=${size}&keyword=${keyword}`}>다음</Link>}
      </div>
    </main>
  );
}
