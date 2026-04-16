import React from 'react';

type PageSkeletonProps = {
  show?: boolean;
  pageName: string;
};
const PageSkeleton = ({
  show = false,
  pageName,
}: PageSkeletonProps) => {
  if (!show) {
    return null;
  }
  
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      { Array.from({ length: 8 } ,(_ ,index) => (
        <div
          key={ `${pageName}-skeleton-${ index }` }
          className="h-84 animate-pulse rounded-[1.75rem] border border-slate-200/80 bg-white/80"
        />
      )) }
    </div>
  );
};
export default PageSkeleton;