/**
 * Created by jorge.machado as 16/04/2026
 **/
import React ,{ useMemo } from 'react';
import { Card ,Text } from '@/app/ds';
import { PokemonStats } from '@/app/ui';
import PokemonCardImage
  from '@/app/ui/components/pokemon-card/pokemon-card-image';
import { formatNumberPrefix } from '@/app/utils';
import PokemonCardHeader
  from '@/app/ui/components/pokemon-card/pokemon-card-header';
import type {
  PokemonCardProps ,
  PokemonCardItem ,
} from './types';
import BattleSummary from '../../primitives/battle-summary';


const INITIAL_POKEMON_DATA: PokemonCardItem = {
  id: '' ,
  show: false,
  wins: 0 ,
  level: 0 ,
  order: 0 ,
  status: 'INCOMPLETE' ,
  losses: 0 ,
  battles: 0 ,
  external_image: '' ,
};

const PokemonCard = ({
  align = 'HORIZONTAL' ,
  onClick,
  pokemon ,
  registry ,
  showStats = false ,
  showBattleSummary = false ,
}: PokemonCardProps) => {
  const defaultPokemonName = 'Unknown Pokémon';

  const pokemonData = useMemo(() => {

    const currentPokemon = registry?.pokemon || pokemon;
    if (!currentPokemon) {
      return INITIAL_POKEMON_DATA;
    }

    const itemData = {
      ...INITIAL_POKEMON_DATA,
      ...currentPokemon,
      show: currentPokemon.status === 'COMPLETE'
    };

    if (!registry) {
      return itemData;
    }

    if (registry) {
      itemData.id = registry.id;
      itemData.hp = registry.hp;
      itemData.wins = registry.wins;
      itemData.maxHp = registry.max_hp;
      itemData.speed = registry.speed;
      itemData.level = registry.level;
      itemData.attack = registry.attack;
      itemData.losses = registry.losses;
      itemData.defense = registry.defense;
      itemData.battles = registry.battles;
      itemData.special_attack = registry.special_attack;
      itemData.special_defense = registry.special_defense;
      itemData.nickname = registry.nickname;
      if (registry?.discovered !== undefined) {
        itemData.show = registry.discovered;
      }
    }
    return itemData;
  } ,[pokemon ,registry]);
  const isInteractive = useMemo(() => !!(pokemonData && pokemonData.show && onClick) ,[pokemonData ,onClick]);

  const displayName = pokemonData?.nickname || pokemonData?.name ||
    defaultPokemonName;

  const handleOnClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    event.stopPropagation();
    if (isInteractive) {
      onClick!({
        id: pokemonData.id ,
        name: pokemonData?.name || defaultPokemonName ,
        order: pokemonData?.order,
        nickname: pokemonData?.nickname ,
      });
    }
  };

  return (
    <Card interactive={ isInteractive } onClick={ handleOnClick }>
      <PokemonCardImage
        image={ pokemonData?.image }
        showImage={ pokemonData?.show }
        displayName={ displayName }
        externalImage={ pokemonData?.external_image }
      />
      <div className="space-y-3 px-1 pb-1 pt-4">
        <Text
          size="sm"
          color="text-slate-400"
          weight="extrabold"
          className="uppercase tracking-[0.16em]"
        >
          { formatNumberPrefix({ value: pokemonData.order }) }
        </Text>
        <PokemonCardHeader
          name={ pokemonData?.name }
          displayName={ displayName }
          align={ align }
          types={ pokemonData?.types }
        />
        {
          pokemonData && showStats && (
            <PokemonStats
              hp={ pokemonData?.hp }
              maxHp={ pokemonData?.hp }
              speed={ pokemonData?.speed }
              attack={ pokemonData?.attack }
              defense={ pokemonData?.defense }
              specialAttack={ pokemonData?.special_attack }
              specialDefense={ pokemonData?.special_defense }
            />
          )
        }
        {
          showBattleSummary && pokemonData && registry && (
            <BattleSummary
              wins={ registry.wins }
              losses={ registry.losses }
              battles={ registry.battles }
              withBorder={ false }
            />
          )
        }

      </div>
    </Card>
  );
};
export default PokemonCard;