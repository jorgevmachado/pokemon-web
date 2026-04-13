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

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  getPageHref?: (page: number) => string;
  isLoading?: boolean;
  className?: string;
  ariaLabel?: string;
};