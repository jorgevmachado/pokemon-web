import React ,{ useMemo } from 'react';
import {
  MdChildFriendly ,
  MdAssistWalker ,
  MdOutlineStar ,
  MdOutlineStarBorder,
} from 'react-icons/md';
import { GiMeepleArmy ,GiMeeple } from 'react-icons/gi';

type InfoPanelProps = {
  title?: string;
  height?: number;
  weight?: number;
  habitat?: string;
  isBaby?:boolean;
  experience?: number;
  isMythical?: boolean;
  isLegendary?: boolean;
  captureRate?: number;
};

type InfoStat = {
  label: string;
  type: 'icon' | 'text';
  value: number | string | boolean | React.ReactNode;
};

const InfoPanel = ({
  title = 'INFO PANEL',
  height,
  weight,
  habitat,
  isBaby,
  experience,
  isMythical,
  isLegendary,
  captureRate
}: InfoPanelProps) => {

  const info: Array<InfoStat> = useMemo(() => {
    const result: Array<InfoStat> = [];
    if (height) {
      result.push({ label: 'Height', type: 'text', value: height });
    }
    if (weight) {
      result.push({ label: 'Weight', type: 'text', value: weight });
    }
    if (habitat) {
      result.push({ label: 'Habitat', type: 'text', value: habitat });
    }
    
    if (captureRate) {
      result.push({ label: 'Capture Rate', type: 'text', value: captureRate });
    }

    if (experience !== undefined) {
      result.push({ label: 'Experience', type: 'text', value: experience });
    }

    if (isBaby !== undefined) {
      result.push({
        label: isBaby ? 'Baby' : 'Grown up',
        type: 'icon',
        value: isBaby ? <MdChildFriendly size={22} /> : <MdAssistWalker size={22} />
      });
    }

    if (isMythical !== undefined) {
      result.push({
        label: isMythical ? 'Mythical' : 'Not Mythical',
        type: 'icon',
        value: isMythical ? <MdOutlineStar size={22} /> : <MdOutlineStarBorder size={22} />
      });
    }
    
    if (isLegendary !== undefined)
      result.push(
        {
          label: isLegendary ? 'Legendary' : 'Not Legendary',
          type: 'icon',
          value: isLegendary ? <GiMeepleArmy size={22} /> : <GiMeeple size={22} />
        }
      );


    return result;
  }, [height, weight, habitat, captureRate, experience, isBaby, isMythical, isLegendary]);
  
  return (
    <article className='overflow-hidden rounded-2xl shadow-sm'>
      <div className='bg-sky-500 px-5 pt-4 pb-2'>
        <h2 className='text-sm font-bold uppercase tracking-widest text-white/80'>
          {title}
        </h2>
      </div>
      <div className='grid grid-cols-2 gap-px bg-sky-400'>
        {info.map(({ label, type, value }) => (
          <div key={label} className='bg-sky-500 px-5 py-3'>
            <p className='text-xs font-semibold uppercase tracking-wide text-white/70'>
              {label}
            </p>
            <p className='mt-0.5 text-lg font-bold text-white'>
              { type === 'icon' ? (
                <span className='inline-flex items-center' aria-label={label} title={label}>
                  {value}
                </span>
              ) :  value }
            </p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default InfoPanel;