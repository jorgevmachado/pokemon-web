import type { TPokemonEvolution } from '@/app/ui/features/pokemon';
import React from 'react';
import { MdChevronRight } from 'react-icons/md';
import EvolutionInfo from '@/app/ui/components/evolution-chain/evolution-info';

type EvolutionChainProps = {
  title?: string;
  evolutions: Array<TPokemonEvolution>;
};
const EvolutionChain = ({
  title = 'Evolution Chain',
  evolutions
}: EvolutionChainProps) => {
  return (
    <article className='mt-5 overflow-hidden rounded-2xl bg-linear-to-br from-slate-700 via-slate-600 to-slate-700 p-6 shadow-inner'>
      <h2 className='mb-6 text-xl font-bold text-white'>
        {title}
      </h2>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        {evolutions.map((evolution, index) => (
          <React.Fragment key={evolution.id}>
            {index > 0 && (
              <MdChevronRight
                size={32}
                className='shrink-0 text-slate-400'
                aria-hidden='true'
              />
            )}
            <EvolutionInfo evolution={evolution} />
          </React.Fragment>
        ))}
      </div>
    </article>
  );
};
export default EvolutionChain;