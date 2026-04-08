import { BaseServiceAbstract } from '@/app/shared/services/service/service';
import { PokedexListQuery ,TPokedex } from '@/app/ui/features/pokedex/types';
import { TPaginatedListResponse  } from '@/app/ui/components/pagination/types';
import { omitUndefined } from '@/app/utils';

export class PokedexService extends BaseServiceAbstract {
  constructor(baseUrl: string ,token?: string) {
    super(baseUrl ,'pokedex' ,token);
  }

  public async list(params: PokedexListQuery = {}): Promise<TPaginatedListResponse<TPokedex> | Array<TPokedex>> {
    const sanitizedParams = omitUndefined(params);
    return this.get<TPaginatedListResponse<TPokedex> | Array<TPokedex>>(
      this.pathUrl ,{ params: { ...sanitizedParams } });
  }

  public async getById(id: string): Promise<TPokedex> {
    return this.get<TPokedex>(`${this.pathUrl}/${id}`);
  }
}

