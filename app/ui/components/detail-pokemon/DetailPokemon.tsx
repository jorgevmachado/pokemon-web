import { DetailPokemonItem ,DetailPokemonProps } from './types';
import { InfoCard } from '@/app/ui';
import { MdCatchingPokemon } from 'react-icons/md';
import React ,{ useMemo } from 'react';
import { normalizedName } from '@/app/utils';
import PageHeader from '@/app/ui/components/detail-pokemon/page-header';
import PageContent from '@/app/ui/components/detail-pokemon/page-content';
import EvolutionChain from '@/app/ui/components/evolution-chain';

const DetailPokemon = ({
  hp,
  wins,
  maxHp,
  level,
  speed,
  attack,
  losses,
  battles,
  defense,
  pokemon ,
  pageName ,
  nickname,
  isLoading ,
  experience,
  errorMessage,
  specialAttack,
  specialDefense
}: DetailPokemonProps) => {

  const item = useMemo(() => {
    if (!pokemon) {
      return;
    }
    const result: DetailPokemonItem = {
      ...pokemon,
      hp: hp || pokemon.hp,
      wins,
      level,
      maxHp,
      speed: speed || pokemon.speed,
      attack: attack || pokemon.attack,
      losses,
      battles,
      defense: defense || pokemon.defense,
      nickname,
      experience,
      special_attack: specialAttack || pokemon.special_attack,
      special_defense: specialDefense || pokemon.special_defense,
    };
    return result;
  }, [attack, battles, defense, experience, hp, level, losses, maxHp, nickname, pokemon, specialAttack, specialDefense, speed, wins]);

  const displayName = item?.name ? normalizedName(item.name) : '';
  const evolutions = item?.evolutions ?? [];

  if (isLoading) {
    return (
      <InfoCard
        icon={ <MdCatchingPokemon size={ 22 }/> }
        variant="blue"
        title={ `Loading ${ pageName } Detail` }
        description={ `Fetching this ${ pageName } entry. Please wait a moment.` }
      />
    );
  }

  if (errorMessage) {
    return (
      <InfoCard
        icon={ <MdCatchingPokemon size={ 22 }/> }
        variant="red"
        title="Unable to Load Detail"
        description={ errorMessage }
      />
    );
  }

  if (!item) {
    return (
      <InfoCard
        icon={ <MdCatchingPokemon size={ 22 }/> }
        variant="yellow"
        title="No Detail Found"
        description={ `This ${ pageName } entry could not be found.` }
      />
    );
  }

  return (
    <section
      className="mx-auto w-full max-w-6xl"
      aria-label={ `${ pageName } detail for ${ displayName }` }
    >

      <PageHeader
        order={ item.order }
        displayName={ displayName }
      />

      <PageContent item={ item } displayName={ displayName }/>

      { evolutions.length > 0 && <EvolutionChain evolutions={ evolutions }/> }

    </section>
  );
};
export default DetailPokemon;