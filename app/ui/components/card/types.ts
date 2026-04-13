import { CardImageProps } from '@/app/ui/components/card/image';
import { CardTagProps } from '@/app/ui/components/card/tag';
import { BattleSummaryProps ,StatsCardProps } from '@/app/ui';

export type CardImage = Omit<CardImageProps ,'displayName' | 'showImage'>;

export type CardOnClickParams = {
  id: string;
  name: string;
  order: number;
  nickname?: string;
}

export type CardProps = {
  id: string;
  type?: 'DETAIL' | 'LIST';
  tags?: Array<CardTagProps>;
  name?: string;
  order: number;
  image: CardImage;
  nickname?: string;
  showInfo?: boolean;
  onClick?: (item: CardOnClickParams) => void;
  stats?: StatsCardProps;
  battleSummary?: BattleSummaryProps;
};