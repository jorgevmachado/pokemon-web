import type { BarChartProps } from '@/app/ds';

export type StatsCardProps = {
  hp: number;
  maxHp?: number;
  title?: string;
  speed: number;
  attack: number;
  defense: number;
  withBorder?: boolean;
  specialAttack: number;
  specialDefense: number;
}

export type TStatEntry = BarChartProps &{
  key: string;
};