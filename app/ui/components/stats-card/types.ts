export type StatsCardProps = {
  hp: number;
  title?: string;
  speed: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
}

export type TStatEntry = {
  key: string;
  label: string;
  value: number;
};