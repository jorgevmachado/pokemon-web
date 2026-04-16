import { TPokemon } from '@/app/ui/features/pokemon';
import { FiltersProps ,TPaginatedMeta } from '@/app/ds';
import { TRegistry } from '@/app/ui';

export type ListPokemonItem = {
  id: string;
  pokemon?: TPokemon;
  registry?: TRegistry;
}

export type ListPokemonProps = {
  meta: TPaginatedMeta;
  items: Array<ListPokemonItem>;
  filters: FiltersProps['filters'];
  pageName: string;
  goToPage: (page: number) => void;
  pageRoute: string;
  isLoading?: boolean;
  clearFilters: () => void;
  errorMessage?: string;
  applyFilters: (nextFilters: Record<string ,string>) => void;
}