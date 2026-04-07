'use client';

import React, { KeyboardEvent, useEffect, useMemo, useState } from 'react';

import { POKEDEX_COPY } from '../../constants';
import type { PokedexFilters as PokedexFiltersValue } from '../../types';
import { TPokemonType } from '@/app/ui/features/pokemon';

type PokedexFiltersProps = {
  filters: PokedexFiltersValue;
  typeOptions: Array<TPokemonType>;
  isLoadingTypes: boolean;
  onApply: (nextFilters: PokedexFiltersValue) => void;
  onClear: () => void;
};

const TYPE_AUTOCOMPLETE_LISTBOX_ID = 'pokedex-type-autocomplete-listbox';
const TYPE_AUTOCOMPLETE_OPTION_PREFIX = 'pokedex-type-option';

const normalizeFilterValues = (filters: PokedexFiltersValue): PokedexFiltersValue => {
  return {
    type: filters?.type?.trim(),
    nickname: filters?.nickname?.trim(),
    order: filters?.order?.trim(),
  };
};

const PokedexFilters = ({
  filters,
  typeOptions,
  isLoadingTypes,
  onApply,
  onClear,
}: PokedexFiltersProps) => {
  const [draftFilters, setDraftFilters] = useState<PokedexFiltersValue>(filters);
  const [isTypeOptionsOpen, setIsTypeOptionsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  useEffect(() => {
    setDraftFilters(filters);
  }, [filters]);

  const hasActiveFilters = useMemo(() => {
    return Boolean(filters.type || filters.nickname || filters.order);
  }, [filters.nickname, filters.order, filters.type]);

  const filteredTypeOptions = useMemo(() => {
    const normalizedQuery = draftFilters?.type?.trim()?.toLowerCase();

    if (!normalizedQuery) {
      return typeOptions.slice(0, 8);
    }

    return typeOptions
      .filter((typeOption) => typeOption.name.toLowerCase().includes(normalizedQuery))
      .slice(0, 8);
  }, [draftFilters.type, typeOptions]);

  useEffect(() => {
    if (!isTypeOptionsOpen) {
      return;
    }

    if (filteredTypeOptions.length === 0) {
      setHighlightedIndex(-1);
      return;
    }

    setHighlightedIndex((previousIndex) => {
      if (previousIndex < 0) {
        return 0;
      }

      return Math.min(previousIndex, filteredTypeOptions.length - 1);
    });
  }, [filteredTypeOptions, isTypeOptionsOpen]);

  const updateDraftValue = (key: keyof PokedexFiltersValue, value: string) => {
    setDraftFilters((previousFilters) => ({
      ...previousFilters,
      [key]: value,
    }));
  };

  const selectTypeOption = (type: TPokemonType) => {
    const value = type.name;
    updateDraftValue('type', value);
    setIsTypeOptionsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleTypeKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsTypeOptionsOpen(true);
      setHighlightedIndex((previousIndex) => {
        if (filteredTypeOptions.length === 0) {
          return -1;
        }

        return previousIndex < filteredTypeOptions.length - 1 ? previousIndex + 1 : 0;
      });
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIsTypeOptionsOpen(true);
      setHighlightedIndex((previousIndex) => {
        if (filteredTypeOptions.length === 0) {
          return -1;
        }

        return previousIndex > 0 ? previousIndex - 1 : filteredTypeOptions.length - 1;
      });
      return;
    }

    if (event.key === 'Enter' && isTypeOptionsOpen && highlightedIndex >= 0) {
      event.preventDefault();
      selectTypeOption(filteredTypeOptions[highlightedIndex]);
      return;
    }

    if (event.key === 'Escape') {
      setIsTypeOptionsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleApply = () => {
    onApply(normalizeFilterValues(draftFilters));
  };

  const handleClear = () => {
    const resetFilters: PokedexFiltersValue = {
      type: '',
      nickname: '',
      order: '',
    };

    setDraftFilters(resetFilters);
    setIsTypeOptionsOpen(false);
    setHighlightedIndex(-1);
    onClear();
  };

  const activeDescendantId = highlightedIndex >= 0
    ? `${TYPE_AUTOCOMPLETE_OPTION_PREFIX}-${highlightedIndex}`
    : undefined;

  return (
    <section className='rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm sm:p-5' aria-label='Pokedex filters'>
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        <label className='relative flex flex-col gap-1.5'>
          <span className='text-xs font-semibold uppercase tracking-wide text-slate-600'>
            {POKEDEX_COPY.filterTypeLabel}
          </span>

          <input
            type='text'
            role='combobox'
            aria-controls={TYPE_AUTOCOMPLETE_LISTBOX_ID}
            aria-expanded={isTypeOptionsOpen}
            aria-autocomplete='list'
            aria-activedescendant={activeDescendantId}
            value={draftFilters.type}
            onFocus={() => setIsTypeOptionsOpen(true)}
            onBlur={() => {
              setTimeout(() => {
                setIsTypeOptionsOpen(false);
                setHighlightedIndex(-1);
              }, 120);
            }}
            onKeyDown={handleTypeKeyDown}
            onChange={(event) => {
              updateDraftValue('type', event.target.value);
              setIsTypeOptionsOpen(true);
            }}
            placeholder={isLoadingTypes ? POKEDEX_COPY.filterTypeLoadingPlaceholder : POKEDEX_COPY.filterTypePlaceholder}
            className='h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
          />

          {isTypeOptionsOpen ? (
            <ul
              id={TYPE_AUTOCOMPLETE_LISTBOX_ID}
              role='listbox'
              className='absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-52 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg'
            >
              {filteredTypeOptions.length > 0 ? (
                filteredTypeOptions.map((typeOption, index) => {
                  const isHighlighted = highlightedIndex === index;

                  return (
                    <li
                      key={typeOption.name}
                      id={`${TYPE_AUTOCOMPLETE_OPTION_PREFIX}-${index}`}
                      role='option'
                      aria-selected={isHighlighted}
                      onMouseDown={() => selectTypeOption(typeOption)}
                      className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition ${isHighlighted ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      {typeOption.name}
                    </li>
                  );
                })
              ) : (
                <li className='px-3 py-2 text-sm text-slate-400'>
                  {POKEDEX_COPY.filterTypeNoResultsLabel}
                </li>
              )}
            </ul>
          ) : null}
        </label>

        <label className='flex flex-col gap-1.5'>
          <span className='text-xs font-semibold uppercase tracking-wide text-slate-600'>
            {POKEDEX_COPY.filterNameLabel}
          </span>
          <input
            type='text'
            value={draftFilters.nickname}
            onChange={(event) => updateDraftValue('nickname', event.target.value)}
            placeholder={POKEDEX_COPY.filterNamePlaceholder}
            className='h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
          />
        </label>

        <label className='flex flex-col gap-1.5'>
          <span className='text-xs font-semibold uppercase tracking-wide text-slate-600'>
            {POKEDEX_COPY.filterOrderLabel}
          </span>
          <input
            type='number'
            min={1}
            value={draftFilters.order}
            onChange={(event) => updateDraftValue('order', event.target.value)}
            placeholder={POKEDEX_COPY.filterOrderPlaceholder}
            className='h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
          />
        </label>
      </div>

      <div className='mt-4 flex flex-wrap justify-end gap-2'>
        <button
          type='button'
          onClick={handleClear}
          disabled={!hasActiveFilters}
          className='rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition enabled:hover:border-slate-300 enabled:hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50'
        >
          {POKEDEX_COPY.filterClearButtonLabel}
        </button>

        <button
          type='button'
          onClick={handleApply}
          className='rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-blue-700'
        >
          {POKEDEX_COPY.filterApplyButtonLabel}
        </button>
      </div>
    </section>
  );
};

export default React.memo(PokedexFilters);

