import { BaseServiceAbstract } from '@/app/shared';
import { TPaginatedListResponse } from '@/app/ui';
import { omitUndefined } from '@/app/utils';
import {
  MyPokemonListQuery ,
  TMyPokemon,
} from '@/app/ui/features/my-pokemon/types';

export class CapturedPokemonsService extends BaseServiceAbstract {
  constructor(baseUrl: string, token?: string) {
    super(baseUrl, 'captured-pokemons', token);
  }

  public async list(params: MyPokemonListQuery = {}): Promise<TPaginatedListResponse<TMyPokemon> | Array<TMyPokemon>> {
    const sanitizedParams = omitUndefined(params);
    return this.get<TPaginatedListResponse<TMyPokemon> | Array<TMyPokemon>>(
      this.pathUrl ,{ params: { ...sanitizedParams } });
  }

  public async getById(id: string): Promise<TMyPokemon> {
    return this.get<TMyPokemon>(`${this.pathUrl}/${id}`);
  }
}