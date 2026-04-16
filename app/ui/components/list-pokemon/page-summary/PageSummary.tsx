import React ,{ useMemo } from 'react';
import { TPaginatedMeta } from '@/app/ds';

type PageSummaryProps = {
  meta: TPaginatedMeta;
  show?: boolean;
  isLoading?: boolean;
}
const PageSummary = ({
  meta,
  show = false,
  isLoading = false,
}: PageSummaryProps) =>  {

  const pageSummary = useMemo(() => {
    const currentStart = meta.offset + 1;
    const currentEnd = Math.min(meta.offset + meta.limit ,meta.total);

    if (meta.total === 0) {
      return '0 Pokémon';
    }

    return `${ currentStart }-${ currentEnd } of ${ meta.total } Pokémon`;
  } ,[meta.limit ,meta.offset ,meta.total]);
  
  if (!show) {
    return null;
  }
  return (
    <div className="flex items-center justify-between gap-3">
      <p
        className="text-sm font-medium text-slate-500">{ pageSummary }</p>
      { isLoading ? (
        <p
          className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Updating...
        </p>
      ) : null }
    </div>
  );
};

export default PageSummary;