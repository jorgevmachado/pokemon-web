import { BaseServiceAbstract } from '@/app/shared';
import { TPaginatedListResponse } from '@/app/ui';
import {
  PokemonTypeListQuery ,
  TPokemonType ,
} from '@/app/ui/features/pokemon/type';
import { omitUndefined } from '@/app/utils';

export class PokemonTypeService extends BaseServiceAbstract {
  constructor(baseUrl: string ,token?: string) {
    super(baseUrl ,'type' ,token);
  }

  public async list(params: PokemonTypeListQuery = {}): Promise<TPaginatedListResponse<TPokemonType> | Array<TPokemonType>> {
    const sanitizedParams = omitUndefined(params);
    return this.get<TPaginatedListResponse<TPokemonType> | Array<TPokemonType>>(
      this.pathUrl ,{ params: { ...sanitizedParams } });
  }
}