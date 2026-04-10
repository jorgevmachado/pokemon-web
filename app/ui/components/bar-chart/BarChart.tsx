import { clampPercentage } from '@/app/utils';
import React ,{ useMemo } from 'react';

type BarChartProps = {
  label: string;
  value: number;
  maxValue?: number;
  compareValue?: number;
};

const getStatBarColor = (value: number): string => {
  if (value >= 130) return 'bg-blue-500';
  if (value >= 90) return 'bg-emerald-500';
  if (value >= 50) return 'bg-amber-400';
  return 'bg-rose-500';
};

const BarChart = ({ label, value, maxValue = 255, compareValue }: BarChartProps) => {
  const currentValue = useMemo(() => {
    if (compareValue) {
      return clampPercentage(value, compareValue);
    }
    return value;
  }, [compareValue, value]);
  const pct = clampPercentage(currentValue, maxValue);
  const barColor = getStatBarColor(currentValue);

  return (
    <div className='flex items-center gap-3'>
      <span className='w-20 shrink-0 text-right text-xs font-semibold text-slate-400'>
        {label}
      </span>
      <span className='w-8 shrink-0 text-center text-xs font-bold text-slate-700'>
        {value}
      </span>
      <div className='h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200'>
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${pct}%` }}
          role='progressbar'
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={maxValue}
          aria-label={label}
        />
      </div>
    </div>
  );
};

export default BarChart;