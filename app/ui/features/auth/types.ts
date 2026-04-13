import { TPokedex } from '@/app/ui/features/pokedex/types';
import { TMyPokemon } from '@/app/ui/features/my-pokemon';

export type SignInParams = {
 email: string;
 password: string;
}

export type LoginResponsePayload = {
  token_type: string;
  access_token: string;
}

export type TTrainer = {
  id: string;
  role: string;
  name: string;
  email: string;
  gender: string;
  status: string;
  pokeballs: number;
  capture_rate: number;
  date_of_birth: Date;
  total_authentications: 288,
  last_authentication_at: number;
  authentication_success: number;
  authentication_failures: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  pokedex: Array<TPokedex>;
  captured_pokemons: Array<TMyPokemon>;
}

export type SignUpParams = {
  name: string;
  email: string;
  gender: string;
  password: string;
  date_of_birth: string;
}

export type InitializeParams = {
  pokeballs?: number;
  capture_rate?: number;
  pokemon_name?: string;
}