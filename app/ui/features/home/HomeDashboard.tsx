'use client';

import React ,{ useMemo } from 'react';

import { useRouter } from 'next/navigation';
import {
  MdCatchingPokemon ,
  MdOutlineCalendarToday ,
  MdOutlineEmail ,
  MdOutlinePerson ,
  MdOutlineSecurity ,
  MdOutlineVerified ,
} from 'react-icons/md';

import { Alert ,Badge ,Button } from '@/app/ds';
import { useUser } from '@/app/ui/features/auth';
import BlankCard from '@/app/ui/components/blank-card';
import Card from '@/app/ui/components/card/Card';
import { Card as DSCard, Text } from '@/app/ds';
import { displayDate } from '@/app/utils/string/string';

import { HOME_COPY } from './constants';
import useHomeOverview from './useHomeOverview';
import InitializeAdventure from '@/app/ui/features/home/initialize-adventure';

const HomeDashboard = () => {
  const router = useRouter();
  const { user } = useUser();
  const {
    wildEncounter ,
    isFindingWild ,
    isEncounterOpen ,
    errorMessage ,
    closeEncounter ,
    fetchPokemons ,
    findWildPokemon ,
    initializeAdventure ,
  } = useHomeOverview();

  const discoveredPokedexCount = useMemo((): number => {
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
      <header>
        <DSCard
          as="div"
          padding="lg"
          rounded="2xl"
          shadow="sm"
          borderColor="slate-200"
          borderWidth={1}
          backgroundColor="white"
          className="bg-linear-to-r from-white to-slate-50"
        >
          <Text size="xs" weight="semibold" transform="uppercase" tracking="wide" tone="primary">
            { HOME_COPY.dashboardLabel }
          </Text>
          <Text as="h2" tone="default" className="mt-2">
            { HOME_COPY.title }
          </Text>
          <Text size="sm" tone="muted" className="mt-2 max-w-2xl sm:text-base">
            { HOME_COPY.subtitle }
          </Text>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-700">
            <Badge
              size="lg"
              tone="primary"
              iconLeft={ <MdOutlinePerson aria-hidden="true"/> }
            >
              { user.name }
            </Badge>
            <Badge
              size="lg"
              tone="neutral"
              iconLeft={ <MdOutlineEmail aria-hidden="true"/> }
            >
              { user.email }
            </Badge>
            <Badge
              size="lg"
              tone="success"
              iconLeft={ <MdOutlineVerified aria-hidden="true"/> }
            >
              { user.status }
            </Badge>
          </div>
        </DSCard>
      </header>

      { isUsingFallbackData ? (
        <Alert type="warning">
          { HOME_COPY.fallbackNotice }
        </Alert>
      ) : null }

      { errorMessage ? <Alert type="error">{ errorMessage }</Alert> : null }

      { user.status === 'INCOMPLETE' ? (
        <InitializeAdventure
          fetchPokemons={ fetchPokemons }
          captureRate={ user?.capture_rate }
          initializeAdventure={ initializeAdventure }
        />
      ) : (
        <>
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
                children: HOME_COPY.profile.title ,
                weight: 'semibold' ,
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
                  value: displayDate(String(user.date_of_birth)) ,
                } ,
              ] }
            />
            <BlankCard
              title={ {
                children: HOME_COPY.activity.title ,
                weight: 'semibold' ,
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
                  value: displayDate(String(user.last_authentication_at)) ,
                } ,
                {
                  label: HOME_COPY.activity.createdAt ,
                  value: displayDate(String(user.created_at)) ,
                } ,
                {
                  label: HOME_COPY.activity.updatedAt ,
                  value: displayDate(String(user.updated_at)) ,
                } ,
              ] }
            />
          </div>

          <article
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Text size="lg" weight="semibold" tone="default">
              { HOME_COPY.topTeam.title }
            </Text>

            { topLevelPokemons.length === 0 ? (
              <Text
                size="sm"
                tone="muted"
                className="mt-3">
                { HOME_COPY.topTeam.empty }
              </Text>
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
                <Text
                  as="h3"
                  size="lg"
                  tone="default"
                  weight="semibold"
                  className="inline-flex items-center gap-2"
                >
                  <MdOutlineSecurity aria-hidden="true"/>
                  { HOME_COPY.encounter.title }
                </Text>
                <Text size="sm" tone="muted"  className="mt-1">
                  { HOME_COPY.encounter.description }
                </Text>
              </div>
              <Button
                type="button"
                onClick={ () => {
                  void findWildPokemon();
                } }
                tone="danger"
                iconLeft={ <MdCatchingPokemon size={20} aria-hidden="true"/> }
                disabled={ isFindingWild }
              >
                { isFindingWild ?
                  HOME_COPY.encounter.ctaLoading :
                  HOME_COPY.encounter.cta }
              </Button>
            </div>
          </article>

          <p className="inline-flex items-center gap-2 text-xs text-slate-500">
            <MdOutlineCalendarToday aria-hidden="true"/>
            { `Last update: ${ displayDate(String(user.updated_at)) }` }
          </p>
        </>
      ) }


      { isEncounterOpen && wildEncounter ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wild-encounter-title"
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6"
          >
            <Text size="xl" weight="bold" tone="default" id="wild-encounter-title">
              { HOME_COPY.encounter.modalTitle }
            </Text>
            <Text className="mt-1" size="sm" tone="muted" id="wild-encounter-subtitle">
              { HOME_COPY.encounter.modalSubtitle }
            </Text>
            <div
              className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Card
                key={ wildEncounter.id }
                id={ wildEncounter.id }
                tags={ wildEncounter?.pokemon?.types?.map((type) => ({
                  key: type.id ,
                  name: type.name ,
                  style: {
                    color: type.text_color ,
                    backgroundColor: type.background_color ,
                  } ,
                })) }
                name={ wildEncounter.pokemon.name }
                order={ wildEncounter.pokemon.order }
                nickname={ wildEncounter.nickname }
                image={ {
                  image: wildEncounter.pokemon.image ,
                  externalImage: wildEncounter.pokemon.external_image ,
                  size: 'sm' ,
                } }
                showInfo={ true }
                onClick={ (item) => {
                  router.push(`/pokedex/${ item.id }`);
                } }
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                tone="neutral"
                onClick={ closeEncounter }
              >
                { HOME_COPY.encounter.fleeAction }
              </Button>

              <Button
                type="button"
                onClick={ handleBattle }
                tone="danger"
              >
                { HOME_COPY.encounter.battleAction }
              </Button>
            </div>
          </div>
        </div>
      ) : null }
    </section>
  );
};

export default React.memo(HomeDashboard);

