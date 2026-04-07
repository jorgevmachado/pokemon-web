import React from 'react';

type CardIconVariant = 'blue' | 'red' | 'yellow' | 'green';

type InfoCardProps = {
  /** Icon rendered inside the coloured badge. Accepts any ReactNode (react-icons, SVG, etc.). */
  icon: React.ReactNode;
  /** Colour variant for the icon badge. */
  variant?: CardIconVariant;
  /** Card heading. */
  title: string;
  /** Card body text. */
  description: string;
  /** Optional extra classes for the article wrapper. */
  className?: string;
};

const badgeStyleByVariant: Record<CardIconVariant, string> = {
  blue: 'bg-blue-100 text-blue-700',
  red: 'bg-red-100 text-red-600',
  yellow: 'bg-yellow-100 text-yellow-700',
  green: 'bg-emerald-100 text-emerald-700',
};

/**
 * Reusable content card with an icon badge, title, and description.
 *
 * @example
 * <InfoCard
 *   icon={<MdOutlineShield size={22} />}
 *   variant='blue'
 *   title='Secure Session'
 *   description='This page requires a valid authentication token.'
 * />
 */
const InfoCard = ({ icon, variant = 'blue', title, description, className = '' }: InfoCardProps) => {
  const badgeClassName = badgeStyleByVariant[variant];

  return (
    <article
      className={`rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${className}`}
    >
      <div className={`mb-3 inline-flex rounded-xl p-2 ${badgeClassName}`} aria-hidden='true'>
        {icon}
      </div>
      <h3 className='text-lg font-semibold text-slate-900'>{title}</h3>
      <p className='mt-2 text-sm text-slate-600'>{description}</p>
    </article>
  );
};

export default React.memo(InfoCard);

