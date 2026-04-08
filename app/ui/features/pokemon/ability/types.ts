export type TPokemonAbility = {
  id: string;
  url: string;
  name: string;
  order: number;
  slot: number;
  is_hidden: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}