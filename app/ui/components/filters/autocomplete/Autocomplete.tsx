import React ,{ KeyboardEvent ,useMemo ,useState } from 'react';
import { FilterOption } from '@/app/ui/components/filters/types';
import { POKEDEX_COPY } from '@/app/ui/features/pokedex/constants';

type AutocompleteProps = {
  name: string;
  value: string;
  options: Array<FilterOption>;
  isLoading: boolean;
  placeholder: string;
  draftFilters: Record<string, string>;
  updateDraftValue: (key: string, value: string) => void;
  loadingPlaceholder?: string;
}
const Autocomplete = ({
  name,
  value,
  options,
  isLoading,
  placeholder,
  draftFilters,
  updateDraftValue,
  loadingPlaceholder,
}: AutocompleteProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const activeDescendantId = highlightedIndex >= 0
    ? `${name}-${highlightedIndex}`
    : undefined;

  const selectOption = (option: FilterOption) => {
    updateDraftValue(name, option.value);
    setIsOptionsOpen(false);
    setHighlightedIndex(-1);
  };
  
  const filteredOptions = useMemo(() => {
    const normalizedQuery = draftFilters?.[name]?.trim()?.toLowerCase();

    if (!normalizedQuery) {
      return options.slice(0, 8);
    }

    return options
      .filter((option) => option.value.toLowerCase().includes(normalizedQuery))
      .slice(0, 8);
  }, [draftFilters, name, options]);

  const filterLoadingPlaceholder = useMemo(() => {
    if (!loadingPlaceholder) {
      return `Loading ${name}...`;
    }
    return loadingPlaceholder;
  }, [loadingPlaceholder, name]);
  
  const handleTypeKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOptionsOpen(true);
      setHighlightedIndex((previousIndex) => {
        if (filteredOptions.length === 0) {
          return -1;
        }

        return previousIndex < filteredOptions.length - 1 ? previousIndex + 1 : 0;
      });
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setIsOptionsOpen(true);
      setHighlightedIndex((previousIndex) => {
        if (filteredOptions.length === 0) {
          return -1;
        }

        return previousIndex > 0 ? previousIndex - 1 : filteredOptions.length - 1;
      });
      return;
    }

    if (event.key === 'Enter' && isOptionsOpen && highlightedIndex >= 0) {
      event.preventDefault();
      selectOption(filteredOptions[highlightedIndex]);
      return;
    }

    if (event.key === 'Escape') {
      setIsOptionsOpen(false);
      setHighlightedIndex(-1);
    }
  };
  
  return (
    <>
      <input
        type='text'
        role='combobox'
        aria-controls={`${name}-autocomplete-listbox`}
        aria-expanded={isOptionsOpen}
        aria-autocomplete='list'
        aria-activedescendant={activeDescendantId}
        value={value}
        onFocus={() => setIsOptionsOpen(true)}
        onBlur={() => {
          setTimeout(() => {
            setIsOptionsOpen(false);
            setHighlightedIndex(-1);
          }, 120);
        }}
        onKeyDown={handleTypeKeyDown}
        onChange={(event) => {
          updateDraftValue(name, event.target.value);
          setIsOptionsOpen(true);
        }}
        placeholder={isLoading ? filterLoadingPlaceholder : placeholder}
        className='h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
      />
      {isOptionsOpen && (
        <ul
          id={`${name}-autocomplete-listbox`}
          role='listbox'
          className='absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-52 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg'
        >
          { filteredOptions.length > 0
            ? (
              filteredOptions.map((option, index) => {
                const isHighlighted = highlightedIndex === index;

                return (
                  <li
                    key={option.key}
                    id={`${name}-option-${index}`}
                    role='option'
                    aria-selected={isHighlighted}
                    onMouseDown={() => selectOption(option)}
                    className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition ${isHighlighted ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    {option.value}
                  </li>
                );
              })
            )
            : (
              <li className='px-3 py-2 text-sm text-slate-400'>
                {POKEDEX_COPY.filterTypeNoResultsLabel}
              </li>
            )
          }

        </ul>
      )}
    </>
  );
};

export default Autocomplete;