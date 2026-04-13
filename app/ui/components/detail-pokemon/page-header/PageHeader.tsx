import { formatNumberPrefix } from '@/app/utils';
import React from 'react';

type PageHeaderProps = {
  order: number;
  displayName: string;
};
const PageHeader = ({
  order,
  displayName
}: PageHeaderProps) => {
  return (
    <header
      className="mb-5 overflow-hidden rounded-2xl bg-linear-to-r from-slate-600 via-slate-400 to-slate-600 px-6 py-4 shadow-md">
      <h1
        className="text-center text-3xl font-bold tracking-tight text-white drop-shadow-sm">
        { displayName }{ ' ' }
        <span className="ml-2 text-2xl font-medium text-white/60">
          { formatNumberPrefix({ value: order }) }
        </span>
      </h1>
    </header>
  );
};
export default PageHeader;