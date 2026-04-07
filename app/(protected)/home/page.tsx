import { MdCatchingPokemon, MdOutlineShield } from 'react-icons/md';

import { Alert } from '@/app/ui/components/alert';
import { InfoCard } from '@/app/ui/components/info-card';

const COPY = {
  title: 'Trainer Home',
  subtitle: 'Welcome to your protected area. Manage your profile and monitor your account status.',
  info: 'Use the sidebar to access your menus.',
  securityTitle: 'Secure Session',
  securityDescription: 'This page is available only when your authentication token is valid.',
  pokemonTitle: 'Pokemon Portal',
  pokemonDescription: 'Navigate through your dashboard using the dynamic sidebar and top navigation.',
};

export default function HomePage() {
  return (
    <section className='mx-auto w-full max-w-6xl space-y-5'>
      <header className='rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm sm:p-6'>
        <p className='text-xs font-semibold uppercase tracking-wide text-blue-700'>Dashboard</p>
        <h2 className='mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>{COPY.title}</h2>
        <p className='mt-2 max-w-2xl text-sm text-slate-600 sm:text-base'>{COPY.subtitle}</p>
      </header>

      <Alert type='info' className='max-w-2xl'>
        {COPY.info}
      </Alert>

      <div className='grid gap-4 sm:grid-cols-2'>
        <InfoCard
          icon={<MdOutlineShield size={22} />}
          variant='blue'
          title={COPY.securityTitle}
          description={COPY.securityDescription}
        />
        <InfoCard
          icon={<MdCatchingPokemon size={22} />}
          variant='red'
          title={COPY.pokemonTitle}
          description={COPY.pokemonDescription}
        />
      </div>
    </section>
  );
}
