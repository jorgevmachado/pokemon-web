export type TPaginatedMeta = {
  total: number;
  limit: number;
  offset: number;
  next_page?: number;
  previous_page?: number;
  total_pages: number;
  current_page: number;
}

export type TPaginatedListResponse<T> = {
  items: Array<T>;
  meta: TPaginatedMeta;
}

export type TListQuery = {
  page?: number;
  limit?: number;
  offset?: number;
}