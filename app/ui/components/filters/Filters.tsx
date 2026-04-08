import { FiltersProps } from '@/app/ui/components/filters/types';
import React ,{ useMemo } from 'react';
import { joinClass } from '@/app/utils';
import Autocomplete from '@/app/ui/components/filters/autocomplete';

const Filters = ({
  filters ,
  onApply ,
  onClear ,
  ariaLabel ,
  filterApplyLabel = 'Apply filters' ,
  filterCleanLabel = 'Clear filters' ,
}: FiltersProps) => {
  const initDraftFilters = (
    filters: FiltersProps['filters'] ,reset: boolean = false) => {
    const result = {} as Record<string ,string>;
    for (const filter of filters) {
      result[filter.name] = reset ? '' : filter.value;
    }
    return result;
  };
  const [draftFilters ,setDraftFilters] = React.useState<Record<string ,string>>(
    initDraftFilters(filters));

  const updateDraftValue = (key: string ,value: string) => {
    setDraftFilters((previousState) => ({
      ...previousState ,
      [key]: value ,
    }));
  };

  const handleClear = () => {
    const resetFilters = initDraftFilters(filters ,true);
    setDraftFilters(resetFilters);
    onClear();
  };

  const hasActiveFilters = useMemo(() => {
    const filterValues = Object.entries(filters).map(([key ,{ value }]) => ({
      key ,
      value ,
    }));
    return filterValues.some((filter) => filter.value !== '');
  } ,[filters]);

  const handleApply = () => {
    const normalizedFilters = Object.fromEntries(
      Object.entries(draftFilters).map(([key ,value]) => [key ,value.trim()]),
    ) as Record<string ,string>;
    onApply(normalizedFilters);
  };

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm sm:p-5"
      aria-label={ ariaLabel }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        { filters.map(({ name ,label ,type, options, isLoading = false, placeholder }) => (
          <label key={ name } className={ joinClass([
            'flex' ,
            'flex-col' ,
            'gap-1.5' ,
            type === 'autocomplete' && 'relative',
          ]) }>
            <span
              className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              { label }
            </span>
            { type === 'autocomplete' && options ? (
              <Autocomplete
                name={name}
                value={ draftFilters[name] }
                options={options}
                isLoading={isLoading}
                draftFilters={draftFilters}
                placeholder={ placeholder }
                updateDraftValue={ updateDraftValue }
              />
            ) : (
              <input
                type="text"
                value={ draftFilters[name] }
                onChange={ (e) => updateDraftValue(name ,e.target.value) }
                placeholder={ placeholder }
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            ) }

          </label>
        )) }
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={ handleClear }
          disabled={ !hasActiveFilters }
          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition enabled:hover:border-slate-300 enabled:hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          { filterCleanLabel }
        </button>

        <button
          type="button"
          onClick={ handleApply }
          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-blue-700"
        >
          { filterApplyLabel }
        </button>
      </div>

    </section>
  );
};

export default React.memo(Filters);