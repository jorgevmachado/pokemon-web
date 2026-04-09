import { TPokedex } from '@/app/ui/features/pokedex/types';
import { TMyPokemon } from '@/app/ui/features/my-pokemon';

export type { AuthActionState } from '@/app/shared/lib/auth/action-state';
export { INITIAL_AUTH_ACTION_STATE } from '@/app/shared/lib/auth/action-state';


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