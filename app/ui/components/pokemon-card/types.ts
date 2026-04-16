import type { TPokemon } from '@/app/ui';
import { TRegistry } from '@/app/ui/types';

export type TAlign = 'HORIZONTAL' | 'VERTICAL';

export type CardOnClickParams = {
  id: string;
  name: string;
  order: number;
  nickname?: string;
}

export type PokemonCardProps = {
  align?: TAlign;
  pokemon?: TPokemon;
  onClick?: (item: CardOnClickParams) => void;
  registry?: TRegistry & {
    discovered?: boolean;
  };
  showStats?: boolean;
  showBattleSummary?: boolean;
};

export type PokemonCardItem =
  TPokemon
  & Pick<TRegistry ,'wins' | 'losses' | 'level' | 'battles'>
  & {
  show: boolean;
  maxHp?: number;
  nickname?: string;
};