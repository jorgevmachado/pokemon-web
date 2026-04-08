import React from 'react';
import CardImage ,{ CardImageProps } from '@/app/ui/components/card/image';
import { formatNumberPrefix ,joinClass } from '@/app/utils';
import CardTag ,{ CardTagProps } from '@/app/ui/components/card/tag';

type CardImage = Omit<CardImageProps, 'displayName' | 'showImage'>;

type CardOnClickParams = {
  id: string;
  name: string;
  order: number;
  nickname?: string;
}

type CardProps = {
  id: string;
  tags?: Array<CardTagProps>;
  name?: string;
  order: number;
  image: CardImage;
  nickname?: string;
  showInfo?: boolean;
  onClick?: (item: CardOnClickParams) => void;
};

const Card = ({
  id,
  tags,
  name,
  order,
  image,
  nickname,
  showInfo,
  onClick,
}: CardProps) => {
  const displayName = nickname || name || 'Unknown Pokémon';
  const displaySubName = name && name !== displayName ?
    name :
    null;

  const handleOnClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    event.stopPropagation();
    if (onClick) {
      onClick({
        id,
        name: name || 'Unknown Pokémon',
        order,
        nickname,
      });
    }
  };

  return (
    <article
      onClick={handleOnClick}
      className={
        joinClass([
          'group' ,
          'rounded-[1.75rem]' ,
          'border',
          'border-slate-200/80',
          'bg-white/95',
          'p-4',
          'shadow-[0_18px_45px_-28px_rgba(15,23,42,0.34)]',
          'transition',
          'duration-300',
          'hover:-translate-y-1',
          'hover:border-blue-200',
          'hover:shadow-[0_24px_60px_-30px_rgba(37,99,235,0.28)]',
          onClick && 'cursor-pointer'
        ])
      }
    >
      <CardImage
        {...image}
        showImage={showInfo}
        displayName={displayName}
      />

      <div className="space-y-3 px-1 pb-1 pt-4">
        <p
          className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-400">
          { formatNumberPrefix({ value: order }) }
        </p>

        <div className="space-y-1">
          <h3 className={ joinClass([
            'wrap-break-word' ,
            'text-[2rem]' ,
            'font-black' ,
            'leading-none' ,
            'tracking-tight' ,
            showInfo ? 'text-slate-800' : 'text-slate-400' ,
          ]) }>
            { displayName }
          </h3>
          { displaySubName && (
            <p className="text-sm font-medium text-slate-500">{ displaySubName }</p>
          ) }
        </div>

        { tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            { tags.map((tag) => <CardTag {...tag} key={tag.key} /> )}
          </div>
        )}


      </div>


    </article>
  );
};

export default React.memo(Card);