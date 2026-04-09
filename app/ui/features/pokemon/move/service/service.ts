import { BaseServiceAbstract } from '@/app/shared';
import { TPaginatedListResponse } from '@/app/ui';
import {
  PokemonMoveListQuery ,
  TPokemonMove ,
} from '@/app/ui/features/pokemon/move';
import { omitUndefined } from '@/app/utils';

export class PokemonMoveService extends BaseServiceAbstract {
  constructor(baseUrl: string ,token?: string) {
    super(baseUrl ,'move' ,token);
  }

  public async list(params: PokemonMoveListQuery = {}): Promise<TPaginatedListResponse<TPokemonMove> | Array<TPokemonMove>> {
    const sanitizedParams = omitUndefined(params);
    return this.get<TPaginatedListResponse<TPokemonMove> | Array<TPokemonMove>>(
      this.pathUrl ,{ params: { ...sanitizedParams } });
  }
}