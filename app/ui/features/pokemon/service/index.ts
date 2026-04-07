import { PokemonService } from '@/app/ui/features/pokemon/service/service';
import { getBaseUrl } from '@/app/utils/url/url';

export const pokemonService = (token?: string): PokemonService => {
  return new PokemonService(getBaseUrl(), token);
};