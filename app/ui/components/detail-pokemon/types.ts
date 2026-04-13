import { TPokemon } from '@/app/ui/features/pokemon';

export type DetailPokemonItem = TPokemon & {
  wins?: number;
  level?: number;
  maxHp?: number;
  losses?: number;
  battles?: number;
  nickname?: string;
  experience?: number;

};
export type DetailPokemonProps = Pick<DetailPokemonItem , 'wins' | 'level'| 'maxHp'| 'losses'| 'battles'| 'nickname'| 'experience'> & {
  hp?: number;
  speed?: number;
  attack?: number;
  defense?: number;
  pokemon?: TPokemon;
  pageName: string;
  isLoading?: boolean;
  errorMessage?: string;
  specialAttack?: number;
  specialDefense?: number;
}