import { CapturedPokemonsService } from './service';
import { getBaseUrl } from '@/app/utils/url/url';

export const capturedPokemonsService = (token?: string): CapturedPokemonsService => {
  return new CapturedPokemonsService(getBaseUrl() ,token);
};

