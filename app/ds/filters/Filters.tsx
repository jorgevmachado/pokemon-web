import React, { useMemo } from 'react';

import { Autocomplete, Input } from '@/app/ds';
import type { FiltersProps } from './types';
import { joinClass } from '@/app/utils';

const Filters = ({
  filters,
  onApply,
  onClear,
  ariaLabel,
  filterApplyLabel = 'Apply filters',
  filterCleanLabel = 'Clear filters',
}: FiltersProps) => {
  const initDraftFilters = (nextFilters: FiltersProps['filters'], reset = false): Record<string, string> => {
    const result = {} as Record<string, string>;

    for (const filter of nextFilters) {
      result[filter.name] = reset ? '' : filter.value;
    }

    return result;
  };

  const [draftFilters, setDraftFilters] = React.useState<Record<string, string>>(
    initDraftFilters(filters));

  const updateDraftValue = (key: string, value: string) => {
    setDraftFilters((previousState) => ({
      ...previousState,
      [key]: value,
    }));
  };

  const handleClear = () => {
    const resetFilters = initDraftFilters(filters, true);
    setDraftFilters(resetFilters);
    onClear();
  };

  const hasActiveFilters = useMemo(() => {
    return Object.values(draftFilters).some((value) => value !== '');
  }, [draftFilters]);

  const handleApply = () => {
    const normalizedFilters = Object.fromEntries(
      Object.entries(draftFilters).map(([key, value]) => [key, value.trim()]),
    ) as Record<string, string>;

    onApply(normalizedFilters);
  };

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm sm:p-5"
      aria-label={ariaLabel}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filters.map(({ name, label, type, options, isLoading = false, placeholder }) => (
          <label key={name} className={joinClass([
            'flex',
            'flex-col',
            'gap-1.5',
            type === 'autocomplete' && 'relative',
          ])}>
            <span
              className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              { label }
            </span>
            { type === 'autocomplete' && options ? (
              <Autocomplete
                name={name}
                value={draftFilters[name]}
                options={options}
                isLoading={isLoading}
                noResultsText='No options found.'
                placeholder={placeholder}
                onValueChange={(nextValue) => {
                  updateDraftValue(name, nextValue);
                }}
              />
            ) : (
              <Input
                type="text"
                value={draftFilters[name]}
                placeholder={placeholder}
                onValueChange={(nextValue) => {
                  updateDraftValue(name, nextValue);
                }}
              />
            ) }

          </label>
        )) }
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={handleClear}
          disabled={!hasActiveFilters}
          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition enabled:hover:border-slate-300 enabled:hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          { filterCleanLabel }
        </button>

        <button
          type="button"
          onClick={handleApply}
          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-blue-700"
        >
          { filterApplyLabel }
        </button>
      </div>

    </section>
  );
};

export default React.memo(Filters);