'use client';

import React ,{ useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  MdCatchingPokemon ,
  MdOutlineCalendarToday ,
  MdOutlineEmail ,
  MdOutlinePerson ,
  MdOutlineSecurity ,
  MdOutlineVerified ,
} from 'react-icons/md';

import { Alert } from '@/app/ui/components';
import { useUser } from '@/app/ui/features/auth';

import { HOME_COPY } from './constants';
import useHomeOverview from './useHomeOverview';
import Badge from '@/app/ui/components/badge';
import BlankCard from '@/app/ui/components/blank-card';
import Card from '@/app/ui/components/card/Card';

const toDisplayDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US' ,{
    dateStyle: 'medium' ,
    timeStyle: 'short' ,
  }).format(date);
};

const HomeDashboard = () => {
  const router = useRouter();
  const { user } = useUser();
  const {
    wildEncounter ,
    isFindingWild ,
    isEncounterOpen ,
    errorMessage ,
    closeEncounter ,
    findWildPokemon ,
  } = useHomeOverview();

  const discoveredPokedexCount = useMemo(() => {
    if (!user || !user?.pokedex) {
      return 0;
    }
    return user.pokedex.filter((entry) => entry.discovered).length;
  } ,[user]);

  const topLevelPokemons = useMemo(() => {
    if (!user || !user.captured_pokemons) {
      return [];
    }
    return [...user.captured_pokemons].sort(
      (left ,right) => right.level - left.level).slice(0 ,3);
  } ,[user]);

  const capturedPokemonCount = user?.captured_pokemons?.length ?? 0;

  const metrics = useMemo(() => {
    if (!user) {
      return [];
    }
    const successRate = user.total_authentications > 0
      ?
      `${ Math.round(
        (user.authentication_success / user.total_authentications) * 100) }%`
      :
      '0%';

    return [
      {
        label: HOME_COPY.metrics.captureRate ,
        value: `${ user.capture_rate }%` ,
      } ,
      {
        label: HOME_COPY.metrics.pokeballs ,
        value: String(user.pokeballs) ,
      } ,
      {
        label: HOME_COPY.metrics.capturedPokemons ,
        value: String(capturedPokemonCount) ,
      } ,
      {
        label: HOME_COPY.metrics.discoveredInPokedex ,
        value: String(discoveredPokedexCount) ,
      } ,
      {
        label: HOME_COPY.metrics.totalAuthentications ,
        value: String(user.total_authentications) ,
      } ,
      {
        label: HOME_COPY.metrics.successRate ,
        value: successRate ,
        helper: `${ HOME_COPY.activity.success }: ${ user.authentication_success } / ${ HOME_COPY.activity.failures }: ${ user.authentication_failures }` ,
      } ,
    ];
  } ,[capturedPokemonCount ,discoveredPokedexCount ,user]);

  const wildPokemonName = useMemo(() => {
    return wildEncounter?.pokemon?.name || 'Unknown Pokemon';
  } ,[wildEncounter?.pokemon?.name]);

  const wildPokemonImage = useMemo(() => {
    return wildEncounter?.pokemon?.external_image ||
      wildEncounter?.pokemon?.image || '/icon.svg';
  } ,[wildEncounter?.pokemon?.external_image ,wildEncounter?.pokemon?.image]);

  if (!user) {
    return null;
  }

  const isUsingFallbackData = !user;

  const handleBattle = () => {
    if (!wildEncounter?.id) {
      router.push('/battle');
      return;
    }

    router.push(`/battle?wildId=${ wildEncounter.id }`);
  };

  return (
    <section className="mx-auto w-full max-w-6xl space-y-5">
      <header
        className="rounded-2xl border border-slate-200 bg-linear-to-r from-white to-slate-50 p-6 shadow-sm">
        <p
          className="text-xs font-semibold uppercase tracking-wide text-blue-700">{ HOME_COPY.dashboardLabel }</p>
        <h2
          className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{ HOME_COPY.title }</h2>
        <p
          className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">{ HOME_COPY.subtitle }</p>

        <div
          className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-700">
          <Badge
            name={ user.name }
            icon={ <MdOutlinePerson aria-hidden="true"/> }
            font="medium"
            type="class"
            rounded="full"
            textColor="text-blue-700"
            backgroundColor="bg-blue-50"
          />
          <Badge
            name={ user.email }
            icon={ <MdOutlineEmail aria-hidden="true"/> }
            font="medium"
            type="class"
            rounded="full"
            backgroundColor="bg-slate-100"
          />
          <Badge
            name={ user.status }
            icon={ <MdOutlineVerified aria-hidden="true"/> }
            font="medium"
            type="class"
            rounded="full"
            textColor="text-emerald-700"
            backgroundColor="bg-emerald-50"
          />
        </div>
      </header>


      { isUsingFallbackData ? (
        <Alert type="warning">
          { HOME_COPY.fallbackNotice }
        </Alert>
      ) : null }

      { errorMessage ? <Alert type="error">{ errorMessage }</Alert> : null }

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="trainer-metrics">
        { metrics.map((metric) => (
          <BlankCard
            key={ metric.label }
            label={ metric.label }
            title={ metric.value }
            helper={ metric.helper }
          />
        )) }
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BlankCard
          title={ {
            text: HOME_COPY.profile.title ,
            font: 'semibold' ,
            size: 'lg' ,
          } }
          shadow="sm"
          list={ [
            {
              label: HOME_COPY.profile.id ,
              value: user.id ,
            } ,
            {
              label: HOME_COPY.profile.role ,
              value: user.role ,
            } ,
            {
              label: HOME_COPY.profile.gender ,
              value: user.gender ,
            } ,
            {
              label: HOME_COPY.profile.email ,
              value: user.email ,
            } ,
            {
              label: HOME_COPY.profile.dateOfBirth ,
              value: toDisplayDate(String(user.date_of_birth)) ,
            },
          ] }
        />
        <BlankCard
          title={ {
            text: HOME_COPY.activity.title ,
            font: 'semibold' ,
            size: 'lg' ,
          } }
          shadow="sm"
          list={ [
            {
              label: HOME_COPY.activity.success ,
              value: String(user.authentication_success) ,
            } ,
            {
              label: HOME_COPY.activity.failures ,
              value: String(user.authentication_failures) ,
            } ,
            {
              label: HOME_COPY.activity.lastLogin ,
              value: toDisplayDate(String(user.last_authentication_at)) ,
            } ,
            {
              label: HOME_COPY.activity.createdAt ,
              value: toDisplayDate(String(user.created_at)) ,
            } ,
            {
              label: HOME_COPY.activity.updatedAt ,
              value: toDisplayDate(String(user.updated_at)) ,
            },
          ] }
        />
      </div>

      <article
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3
          className="text-lg font-semibold text-slate-900">{ HOME_COPY.topTeam.title }</h3>

        { topLevelPokemons.length === 0 ? (
          <p
            className="mt-3 text-sm text-slate-600">{ HOME_COPY.topTeam.empty }</p>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            { topLevelPokemons.map((myPokemon) => (
              <Card
                key={ myPokemon.id }
                id={ myPokemon.id }
                tags={ myPokemon?.pokemon?.types?.map((type) => ({
                  key: type.id ,
                  name: type.name ,
                  style: {
                    color: type.text_color ,
                    backgroundColor: type.background_color ,
                  } ,
                })) }
                name={ myPokemon.pokemon.name }
                order={ myPokemon.pokemon.order }
                nickname={ myPokemon.nickname }
                image={ {
                  image: myPokemon.pokemon.image ,
                  externalImage: myPokemon.pokemon.external_image ,
                } }
                showInfo={ true }
                onClick={ (item) => {
                  router.push(`/my-pokemon/${ item.id }`);
                } }
              />
            )) }
          </div>
        ) }
      </article>

      <article
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3
              className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900">
              <MdOutlineSecurity aria-hidden="true"/>
              { HOME_COPY.encounter.title }
            </h3>
            <p
              className="mt-1 text-sm text-slate-600">{ HOME_COPY.encounter.description }</p>
          </div>
          <button
            type="button"
            onClick={ () => {
              void findWildPokemon();
            } }
            disabled={ isFindingWild }
            className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <MdCatchingPokemon className="mr-2" size={ 20 } aria-hidden="true"/>
            { isFindingWild ?
              HOME_COPY.encounter.ctaLoading :
              HOME_COPY.encounter.cta }
          </button>
        </div>
      </article>

      { isEncounterOpen && wildEncounter ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wild-encounter-title"
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6"
          >
            <h3 id="wild-encounter-title"
              className="text-xl font-bold text-slate-900">
              { HOME_COPY.encounter.modalTitle }
            </h3>
            <p
              className="mt-1 text-sm text-slate-600">{ HOME_COPY.encounter.modalSubtitle }</p>

            <div
              className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-4">
                <div
                  className="relative h-24 w-24 overflow-hidden rounded-xl bg-white">
                  <Image
                    src={ wildPokemonImage }
                    alt={ `${ wildPokemonName } artwork` }
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
                <div>
                  <p
                    className="text-lg font-bold text-slate-900">{ wildPokemonName }</p>
                  <p
                    className="text-sm text-slate-500">#{ wildEncounter.pokemon.order }</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={ closeEncounter }
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                { HOME_COPY.encounter.fleeAction }
              </button>
              <button
                type="button"
                onClick={ handleBattle }
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                { HOME_COPY.encounter.battleAction }
              </button>
            </div>
          </div>
        </div>
      ) : null }

      <p className="inline-flex items-center gap-2 text-xs text-slate-500">
        <MdOutlineCalendarToday aria-hidden="true"/>
        { `Last update: ${ toDisplayDate(String(user.updated_at)) }` }
      </p>
    </section>
  );
};

export default React.memo(HomeDashboard);

