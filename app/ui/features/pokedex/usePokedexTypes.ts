'use client';

import { useEffect, useState } from 'react';

type UsePokedexTypesResult = {
  typeOptions: string[];
  isLoadingTypes: boolean;
};

type TypeOptionsResponse = {
  items?: Array<{
    name?: string;
  }>;
};

const usePokedexTypes = (): UsePokedexTypesResult => {
  const [typeOptions, setTypeOptions] = useState<string[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchTypeOptions = async () => {
      try {
        const response = await fetch('/api/pokedex/types', {
          method: 'GET',
          cache: 'no-store',
        });

        const json = (await response.json()) as TypeOptionsResponse;

        if (!response.ok || !isMounted) {
          return;
        }

        const options = (json.items ?? [])
          .map((item) => item.name?.trim() ?? '')
          .filter(Boolean)
          .sort((left, right) => left.localeCompare(right));

        setTypeOptions(Array.from(new Set(options)));
      } catch {
        if (!isMounted) {
          return;
        }

        setTypeOptions([]);
      } finally {
        if (isMounted) {
          setIsLoadingTypes(false);
        }
      }
    };

    void fetchTypeOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    typeOptions,
    isLoadingTypes,
  };
};

export default usePokedexTypes;
