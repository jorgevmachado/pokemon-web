'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  MdCatchingPokemon,
  MdOutlineCalendarToday,
  MdOutlineEmail,
  MdOutlinePerson,
  MdOutlineSecurity,
  MdOutlineVerified,
} from 'react-icons/md';

import { Alert } from '@/app/ui/components';
import { useUser } from '@/app/ui/features/auth';

import { HOME_COPY, HOME_FAKE_TRAINER } from './constants';
import useHomeOverview from './useHomeOverview';

type MetricCardProps = {
  label: string;
  value: string;
  helper?: string;
};

type DetailRowProps = {
  label: string;
  value: string;
};

type TopPokemonCardProps = {
  rank: number;
  pokemonName: string;
  nickname: string;
  level: number;
};

const toDisplayDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

const toDisplayPokemonName = (value: string): string => {
  return value
    .split('-')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

type HomeTrainerSnapshot = typeof HOME_FAKE_TRAINER;

const toTrainerSnapshot = (value: ReturnType<typeof useUser>['user']): HomeTrainerSnapshot => {
  if (!value) {
    return HOME_FAKE_TRAINER;
  }

  return {
    id: value.id,
    name: value.name,
    email: value.email,
    role: value.role,
    status: value.status,
    gender: value.gender,
    pokeballs: value.pokeballs,
    captureRate: value.capture_rate,
    totalAuthentications: value.total_authentications,
    authenticationSuccess: value.authentication_success,
    authenticationFailures: value.authentication_failures,
    createdAt: String(value.created_at),
    updatedAt: String(value.updated_at),
    dateOfBirth: String(value.date_of_birth),
    lastAuthenticationAt: String(value.last_authentication_at),
    capturedPokemons: value.captured_pokemons.map((pokemon) => ({
      id: pokemon.id,
      nickname: pokemon.nickname,
      pokemonName: pokemon.pokemon?.name || 'Unknown Pokemon',
      level: pokemon.level,
    })),
    pokedexEntries: value.pokedex.map((entry) => ({
      id: entry.id,
      pokemonName: entry.pokemon?.name || 'Unknown Pokemon',
      discovered: entry.discovered,
    })),
  };
};

const MetricCard = ({ label, value, helper }: MetricCardProps) => {
  return (
    <article className='rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm'>
      <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>{label}</p>
      <p className='mt-2 text-2xl font-bold text-slate-900'>{value}</p>
      {helper ? <p className='mt-1 text-xs text-slate-500'>{helper}</p> : null}
    </article>
  );
};

const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <div className='flex items-center justify-between gap-3 py-2'>
      <span className='text-sm font-medium text-slate-500'>{label}</span>
      <span className='text-sm font-semibold text-slate-800'>{value}</span>
    </div>
  );
};

const TopPokemonCard = ({ rank, pokemonName, nickname, level }: TopPokemonCardProps) => {
  return (
    <article className='rounded-xl border border-slate-200 bg-white p-4'>
      <p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>{`#${rank}`}</p>
      <p className='mt-1 text-base font-bold text-slate-900'>{toDisplayPokemonName(pokemonName)}</p>
      <p className='text-sm text-slate-600'>{nickname}</p>
      <p className='mt-2 text-sm font-semibold text-blue-700'>{`Level ${level}`}</p>
    </article>
  );
};

const HomeDashboard = () => {
  const router = useRouter();
  const { user } = useUser();
  const {
    wildEncounter,
    isFindingWild,
    isEncounterOpen,
    errorMessage,
    closeEncounter,
    findWildPokemon,
  } = useHomeOverview();

  const trainer = useMemo(() => {
    return toTrainerSnapshot(user);
  }, [user]);

  const isUsingFallbackData = !user;

  const capturedPokemonCount = trainer.capturedPokemons.length;

  const discoveredPokedexCount = useMemo(() => {
    return trainer.pokedexEntries.filter((entry) => entry.discovered).length;
  }, [trainer.pokedexEntries]);

  const topLevelPokemons = useMemo(() => {
    return [...trainer.capturedPokemons]
      .sort((left, right) => right.level - left.level)
      .slice(0, 3);
  }, [trainer.capturedPokemons]);

  const metrics = useMemo(() => {
    const successRate = trainer.totalAuthentications > 0
      ? `${Math.round((trainer.authenticationSuccess / trainer.totalAuthentications) * 100)}%`
      : '0%';

    return [
      {
        label: HOME_COPY.metrics.captureRate,
        value: `${trainer.captureRate}%`,
      },
      {
        label: HOME_COPY.metrics.pokeballs,
        value: String(trainer.pokeballs),
      },
      {
        label: HOME_COPY.metrics.capturedPokemons,
        value: String(capturedPokemonCount),
      },
      {
        label: HOME_COPY.metrics.discoveredInPokedex,
        value: String(discoveredPokedexCount),
      },
      {
        label: HOME_COPY.metrics.totalAuthentications,
        value: String(trainer.totalAuthentications),
      },
      {
        label: HOME_COPY.metrics.successRate,
        value: successRate,
        helper: `${HOME_COPY.activity.success}: ${trainer.authenticationSuccess} / ${HOME_COPY.activity.failures}: ${trainer.authenticationFailures}`,
      },
    ];
  }, [capturedPokemonCount, discoveredPokedexCount, trainer.authenticationFailures, trainer.authenticationSuccess, trainer.captureRate, trainer.pokeballs, trainer.totalAuthentications]);

  const wildPokemonName = useMemo(() => {
    return wildEncounter?.pokemon?.name || 'Unknown Pokemon';
  }, [wildEncounter?.pokemon?.name]);

  const wildPokemonImage = useMemo(() => {
    return wildEncounter?.pokemon?.external_image || wildEncounter?.pokemon?.image || '/icon.svg';
  }, [wildEncounter?.pokemon?.external_image, wildEncounter?.pokemon?.image]);

  const handleBattle = () => {
    if (!wildEncounter?.id) {
      router.push('/battle');
      return;
    }

    router.push(`/battle?wildId=${wildEncounter.id}`);
  };

  return (
    <section className='mx-auto w-full max-w-6xl space-y-5'>
      <header className='rounded-2xl border border-slate-200 bg-linear-to-r from-white to-slate-50 p-6 shadow-sm'>
        <p className='text-xs font-semibold uppercase tracking-wide text-blue-700'>{HOME_COPY.dashboardLabel}</p>
        <h2 className='mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>{HOME_COPY.title}</h2>
        <p className='mt-2 max-w-2xl text-sm text-slate-600 sm:text-base'>{HOME_COPY.subtitle}</p>

        <div className='mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-700'>
          <span className='inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700'>
            <MdOutlinePerson aria-hidden='true' />
            {trainer.name}
          </span>
          <span className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-medium'>
            <MdOutlineEmail aria-hidden='true' />
            {trainer.email}
          </span>
          <span className='inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700'>
            <MdOutlineVerified aria-hidden='true' />
            {trainer.status}
          </span>
        </div>
      </header>


      {isUsingFallbackData ? (
        <Alert type='warning'>
          {HOME_COPY.fallbackNotice}
        </Alert>
      ) : null}

      {errorMessage ? <Alert type='error'>{errorMessage}</Alert> : null}

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3' aria-label='trainer-metrics'>
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            helper={metric.helper}
          />
        ))}
      </div>

      <div className='grid gap-4 lg:grid-cols-2'>
        <article className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-900'>{HOME_COPY.profile.title}</h3>

          <div className='mt-4 divide-y divide-slate-100'>
            <DetailRow label={HOME_COPY.profile.id} value={trainer.id} />
            <DetailRow label={HOME_COPY.profile.role} value={trainer.role} />
            <DetailRow label={HOME_COPY.profile.gender} value={trainer.gender} />
            <DetailRow label={HOME_COPY.profile.email} value={trainer.email} />
            <DetailRow label={HOME_COPY.profile.dateOfBirth} value={toDisplayDate(trainer.dateOfBirth)} />
          </div>
        </article>

        <article className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
          <h3 className='text-lg font-semibold text-slate-900'>{HOME_COPY.activity.title}</h3>

          <div className='mt-4 divide-y divide-slate-100'>
            <DetailRow label={HOME_COPY.activity.success} value={String(trainer.authenticationSuccess)} />
            <DetailRow label={HOME_COPY.activity.failures} value={String(trainer.authenticationFailures)} />
            <DetailRow label={HOME_COPY.activity.lastLogin} value={toDisplayDate(trainer.lastAuthenticationAt)} />
            <DetailRow label={HOME_COPY.activity.createdAt} value={toDisplayDate(trainer.createdAt)} />
            <DetailRow label={HOME_COPY.activity.updatedAt} value={toDisplayDate(trainer.updatedAt)} />
          </div>
        </article>
      </div>

      <article className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
        <h3 className='text-lg font-semibold text-slate-900'>{HOME_COPY.topTeam.title}</h3>

        {topLevelPokemons.length === 0 ? (
          <p className='mt-3 text-sm text-slate-600'>{HOME_COPY.topTeam.empty}</p>
        ) : (
          <div className='mt-4 grid gap-3 md:grid-cols-3'>
            {topLevelPokemons.map((pokemon, index) => (
              <TopPokemonCard
                key={pokemon.id}
                rank={index + 1}
                pokemonName={pokemon.pokemonName}
                nickname={pokemon.nickname}
                level={pokemon.level}
              />
            ))}
          </div>
        )}
      </article>

      <article className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h3 className='inline-flex items-center gap-2 text-lg font-semibold text-slate-900'>
              <MdOutlineSecurity aria-hidden='true' />
              {HOME_COPY.encounter.title}
            </h3>
            <p className='mt-1 text-sm text-slate-600'>{HOME_COPY.encounter.description}</p>
          </div>
          <button
            type='button'
            onClick={() => {
              void findWildPokemon();
            }}
            disabled={isFindingWild}
            className='inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
          >
            <MdCatchingPokemon className='mr-2' size={20} aria-hidden='true' />
            {isFindingWild ? HOME_COPY.encounter.ctaLoading : HOME_COPY.encounter.cta}
          </button>
        </div>
      </article>

      {isEncounterOpen && wildEncounter ? (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4'>
          <div
            role='dialog'
            aria-modal='true'
            aria-labelledby='wild-encounter-title'
            className='w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6'
          >
            <h3 id='wild-encounter-title' className='text-xl font-bold text-slate-900'>
              {HOME_COPY.encounter.modalTitle}
            </h3>
            <p className='mt-1 text-sm text-slate-600'>{HOME_COPY.encounter.modalSubtitle}</p>

            <div className='mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <div className='flex items-center gap-4'>
                <div className='relative h-24 w-24 overflow-hidden rounded-xl bg-white'>
                  <Image
                    src={wildPokemonImage}
                    alt={`${wildPokemonName} artwork`}
                    fill
                    className='object-contain p-2'
                    unoptimized
                  />
                </div>
                <div>
                  <p className='text-lg font-bold text-slate-900'>{wildPokemonName}</p>
                  <p className='text-sm text-slate-500'>#{wildEncounter.pokemon.order}</p>
                </div>
              </div>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-3'>
              <button
                type='button'
                onClick={closeEncounter}
                className='rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100'
              >
                {HOME_COPY.encounter.fleeAction}
              </button>
              <button
                type='button'
                onClick={handleBattle}
                className='rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700'
              >
                {HOME_COPY.encounter.battleAction}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <p className='inline-flex items-center gap-2 text-xs text-slate-500'>
        <MdOutlineCalendarToday aria-hidden='true' />
        {`Last update: ${toDisplayDate(trainer.updatedAt)}`}
      </p>
    </section>
  );
};

export default React.memo(HomeDashboard);

