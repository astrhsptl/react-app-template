export type EntityId = string | number;

export type PaginatedResult<T> = {
  next: number | null;
  prev: number | null;
  pages: number | null;
  data: T[];
};
