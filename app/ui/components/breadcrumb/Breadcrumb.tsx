'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { MdChevronRight, MdHome } from 'react-icons/md';

import { buildBreadcrumbs } from './breadcrumb-config';

/**
 * Global breadcrumb component.
 * Reads the current pathname internally — no props required.
 * Returns null on root-level pages where no hierarchy exists.
 *
 * Extend ROUTE_SEGMENT_LABELS in breadcrumb-config.ts to add labels for new routes.
 */
const Breadcrumb = () => {
  const pathname = usePathname();
  const items = useMemo(() => buildBreadcrumbs(pathname), [pathname]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label='Breadcrumb'
      className='mb-5 flex items-center'
    >
      <ol className='flex flex-wrap items-center gap-x-1 gap-y-1'>
        <li className='flex items-center'>
          <Link
            href='/home'
            aria-label='Go to Home'
            className='flex items-center rounded-md p-1 text-slate-400 transition hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
          >
            <MdHome size={16} aria-hidden='true' />
          </Link>
        </li>

        {items.map((item) => (
          <li key={item.href} className='flex items-center gap-x-1'>
            <MdChevronRight
              size={15}
              aria-hidden='true'
              className='shrink-0 text-slate-300'
            />
            {item.isCurrent ? (
              <span
                aria-current='page'
                className='text-sm font-semibold text-slate-700'
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className='text-sm font-medium text-slate-400 transition hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default React.memo(Breadcrumb);

