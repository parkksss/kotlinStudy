const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080/api";

export const api = {
  async get<T>(path: string) {
    const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<T>;
  },
  async post<T>(path: string, body: unknown) {
    const res = await fetch(`${BASE}${path}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<T>;
  },
  async put<T>(path: string, body: unknown) {
    const res = await fetch(`${BASE}${path}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<T>;
  },
  async del(path: string) {
    const res = await fetch(`${BASE}${path}`, { method: "DELETE" });
    if (!res.ok) throw new Error(await res.text());
  },
};
