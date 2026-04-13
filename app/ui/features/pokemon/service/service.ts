import { BaseServiceAbstract } from '@/app/shared';
import { TPaginatedListResponse } from '@/app/ds/pagination/types';
import { PokemonTypeService } from '@/app/ui/features/pokemon/type';
import { PokemonListQuery ,TPokemon } from '@/app/ui/features/pokemon/types';
import { omitUndefined } from '@/app/utils';

export class PokemonService extends BaseServiceAbstract {
  protected typeService: PokemonTypeService;

  constructor(baseUrl: string ,token?: string) {
    super(baseUrl ,'pokemon' ,token);
    this.typeService = new PokemonTypeService(baseUrl ,token);
  }

  get type(): PokemonTypeService {
    return this.typeService;
  }

  public async list(params: PokemonListQuery = {}): Promise<TPaginatedListResponse<TPokemon> | Array<TPokemon>> {
    const sanitizedParams = omitUndefined(params);
    return this.get<TPaginatedListResponse<TPokemon> | Array<TPokemon>>(
      this.pathUrl ,{ params: { ...sanitizedParams } });
  }

  public async getById(id: string): Promise<TPokemon> {
    return this.get<TPokemon>(`${ this.pathUrl }/${ id }`);
  }
}