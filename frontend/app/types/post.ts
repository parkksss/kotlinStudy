export type PostRes = {
  id: number; title: string; content: string; author: string;
  createdAt: string; updatedAt: string;
};
export type PageRes<T> = {
  content: T[]; totalElements: number; totalPages: number; number: number; size: number;
};
