'use client';

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { MdCatchingPokemon } from 'react-icons/md';

import { formatNumberPrefix ,normalizedName } from '@/app/utils';
import { InfoCard } from '@/app/ui/components';
import { POKEDEX_COPY } from '@/app/ui/features/pokedex/constants';
import StatsCard from '@/app/ui/components/stats-card';
import InfoPanel from '@/app/ui/components/info-panel';
import CardBadge from '@/app/ui/components/card-badge';
import EvolutionChain from '@/app/ui/components/evolution-chain';
import CardDescription from '@/app/ui/components/card-description';
import usePokemonDetail
  from '@/app/ui/features/pokemon/detail/usePokemonDetail';

const PokemonDetail = () => {
  const params = useParams();
  const pokemonId = params.id as string;

  const { item ,isLoading ,errorMessage } = usePokemonDetail(pokemonId);

  if (isLoading) {
    return (
      <InfoCard
        icon={ <MdCatchingPokemon size={ 22 }/> }
        variant="blue"
        title={ POKEDEX_COPY.detailLoadingTitle }
        description={ POKEDEX_COPY.detailLoadingDescription }
      />
    );
  }

  if (errorMessage) {
    return (
      <InfoCard
        icon={ <MdCatchingPokemon size={ 22 }/> }
        variant="red"
        title={ POKEDEX_COPY.detailErrorTitle }
        description={ errorMessage }
      />
    );
  }

  if (!item) {
    return (
      <InfoCard
        icon={ <MdCatchingPokemon size={ 22 }/> }
        variant="yellow"
        title={ POKEDEX_COPY.detailEmptyTitle }
        description={ POKEDEX_COPY.detailEmptyDescription }
      />
    );
  }

  const displayName = normalizedName(item.name);
  const imageSource =
    item.external_image || item.image || '/icon.svg';
  const evolutions = item.evolutions ?? [];

  return (
    <section
      className="mx-auto w-full max-w-6xl"
      aria-label={ `Pokédex detail for ${ displayName }` }
    >
      {/* ── Header ─────────────────────────────────────────── */ }
      <header
        className="mb-5 overflow-hidden rounded-2xl bg-linear-to-r from-slate-600 via-slate-400 to-slate-600 px-6 py-4 shadow-md">
        <h1
          className="text-center text-3xl font-bold tracking-tight text-white drop-shadow-sm">
          { displayName }{ ' ' }
          <span className="ml-2 text-2xl font-medium text-white/60">
            { formatNumberPrefix({ value: item.order }) }
          </span>
        </h1>
      </header>

      {/* ── Main grid ──────────────────────────────────────── */ }
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">

        {/* Left column */ }
        <div className="space-y-4">

          {/* Artwork */ }
          <article
            className="overflow-hidden rounded-2xl border border-slate-200/60 bg-linear-to-br from-slate-100 to-slate-200 shadow-sm">
            <div
              className="relative flex min-h-80 items-center justify-center p-8">
              <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6)_0%,transparent_70%)]"/>
              <Image
                src={ imageSource }
                alt={ `${ displayName } official artwork` }
                width={ 400 }
                height={ 400 }
                unoptimized
                className="relative z-10 h-auto max-h-72 w-full object-contain drop-shadow-lg"
              />
            </div>
          </article>

          {/* Stats */ }
          <StatsCard
            hp={ item.hp ?? 0 }
            title="STATS"
            speed={ item.speed ?? 0 }
            attack={ item.attack ?? 0 }
            defense={ item.defense ?? 0 }
            specialAttack={ item.special_attack ?? 0 }
            specialDefense={ item.special_defense ?? 0 }
          />
        </div>

        {/* Right column */ }
        <div className="space-y-4">

          {/* Description / Nickname */ }
          <CardDescription
            hp={ item.hp }
            name={ item.name }
          />

          <InfoPanel
            height={ item.height }
            weight={ item.weight }
            isBaby={ item.is_baby }
            habitat={ item.habitat }
            experience={ item.base_experience }
            isMythical={ item.is_mythical }
            isLegendary={ item.is_legendary }
            captureRate={ item.capture_rate }
          />

          {/* Types */ }
          { item.types && item.types.length > 0 && (
            <CardBadge
              title="TYPES"
              badges={ item.types.map((type) => ({
                id: type.id ,
                name: normalizedName(type.name) ,
                style:{
                  color: type.text_color ,
                  backgroundColor: type.background_color ,
                }
              })) }
            />
          ) }
          {/* Abilities */ }
          { item.abilities && item.abilities.length > 0 && (
            <CardBadge
              title="ABILITIES"
              badges={ item.abilities.map((type) => ({
                id: type.id ,
                name: normalizedName(type.name) ,
              })) }
              randomColors={true}
            />
          ) }
        </div>
      </div>

      {/* ── Evolution chain ────────────────────────────────── */ }
      { evolutions.length > 0 && <EvolutionChain evolutions={ evolutions }/> }
    </section>
  );
};

export default React.memo(PokemonDetail);

