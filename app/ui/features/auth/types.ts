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