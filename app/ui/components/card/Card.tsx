import React ,{ useMemo } from 'react';
import CardImage from '@/app/ui/components/card/image';
import { formatNumberPrefix ,joinClass } from '@/app/utils';
import CardTag from '@/app/ui/components/card/tag';
import { BattleSummary ,StatsCard  } from '@/app/ui';
import { CardProps } from '@/app/ui/components/card/types';

const Card = ({
  id ,
  type = 'LIST' ,
  tags ,
  name ,
  order ,
  image ,
  nickname ,
  showInfo ,
  onClick ,
  stats ,
  battleSummary ,
}: CardProps) => {
  const displayName = nickname || name || 'Unknown Pokémon';
  const displaySubName = name && name !== displayName ?
    name :
    null;

  const handleOnClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    event.stopPropagation();
    if (onClick) {
      onClick({
        id ,
        name: name || 'Unknown Pokémon' ,
        order ,
        nickname ,
      });
    }
  };

  const headerClassName = useMemo(() => {
    const classNames = [
      'flex' ,
      'space-y-1' ,
    ];
    if (type === 'LIST') {
      classNames.push('flex-col');
      classNames.push('gap-2');
    }
    if (type === 'DETAIL') {
      classNames.push('items-center');
      classNames.push('justify-between');
    }
    return joinClass(classNames);
  } ,[type]);

  return (
    <article
      onClick={ handleOnClick }
      className={
        joinClass([
          'group' ,
          'rounded-[1.75rem]' ,
          'border' ,
          'border-slate-200/80' ,
          'bg-white/95' ,
          'p-4' ,
          'shadow-[0_18px_45px_-28px_rgba(15,23,42,0.34)]' ,
          'transition' ,
          'duration-300' ,
          'hover:-translate-y-1' ,
          'hover:border-blue-200' ,
          'hover:shadow-[0_24px_60px_-30px_rgba(37,99,235,0.28)]' ,
          onClick && 'cursor-pointer' ,
        ])
      }
    >
      <CardImage
        { ...image }
        showImage={ showInfo }
        displayName={ displayName }
      />

      <div className="space-y-3 px-1 pb-1 pt-4">
        <p
          className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-400">
          { formatNumberPrefix({ value: order }) }
        </p>

        <div className={ headerClassName }>
          <h3 className={ joinClass([
            'wrap-break-word' ,
            'text-[2rem]' ,
            'font-black' ,
            'leading-none' ,
            'tracking-tight' ,
            showInfo ? 'text-slate-800' : 'text-slate-400' ,
          ]) }>
            { displayName }
            { displaySubName && (
              <p
                className="text-sm font-medium text-slate-500">({ displaySubName })</p>
            ) }
          </h3>

          { tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              { tags.map((tag) => <CardTag { ...tag } key={ tag.key }/>) }
            </div>
          ) }
        </div>

        { stats && (
          <StatsCard { ...stats } />
        ) }

        { battleSummary && (
          <BattleSummary { ...battleSummary } />
        ) }

      </div>


    </article>
  );
};

export default React.memo(Card);