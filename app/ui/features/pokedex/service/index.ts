import { PokedexService } from './service';
import { getBaseUrl } from '@/app/utils/url/url';

export const pokedexService = (token?: string): PokedexService => {
  return new PokedexService(getBaseUrl(), token);
};

