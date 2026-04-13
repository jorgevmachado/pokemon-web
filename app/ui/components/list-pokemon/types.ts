import { TPokemon } from '@/app/ui/features/pokemon';
import { FiltersProps ,TPaginatedMeta } from '@/app/ui';

export type ListPokemonItem = {
  id: string;
  name?: string;
  types: TPokemon['types'];
  order: number;
  image?: string;
  showInfo?: boolean;
  nickname?: string;
  externalImage?: string;
}

export type TShowItem = 'DISCOVERED' | 'STATUS';

export type ListPokemonProps = {
  meta: TPaginatedMeta;
  items: Array<ListPokemonItem>;
  filters: FiltersProps['filters'];
  pageName: string;
  goToPage: (page: number) => void;
  showType?: TShowItem;
  pageRoute: string;
  isLoading?: boolean;
  clearFilters: () => void;
  errorMessage?: string;
  applyFilters: (nextFilters: Record<string ,string>) => void;
}