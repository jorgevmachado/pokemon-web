import { BaseServiceAbstract } from '@/app/shared/services/service/service';

import {
  LoginResponsePayload ,
  SignInParams ,TTrainer ,
} from '@/app/ui/features/auth/types';
import { extractAuthToken } from '@/app/shared/lib/auth/token';

export class AuthService extends BaseServiceAbstract {

  constructor(baseUrl: string, token?: string) {
    super(baseUrl, 'auth', token);
  }

  public async login(params: SignInParams): Promise<string> {
    const response = await this.post<SignInParams, LoginResponsePayload>(`${this.pathUrl}/token`, {
      body: params,
    });

    return extractAuthToken(response);
  }

  public async me(): Promise<TTrainer> {
    return await this.get<TTrainer>(`${this.pathUrl}/me`);
  }

}