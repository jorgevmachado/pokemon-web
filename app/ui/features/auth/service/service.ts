import { BaseServiceAbstract } from '@/app/shared/services/service/service';

import {
  InitializeParams ,
  LoginResponsePayload ,
  SignInParams ,SignUpParams ,TTrainer ,
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

  public async register(payload: SignUpParams): Promise<TTrainer> {
    return await this.post<SignUpParams, TTrainer>('trainers', {
      body: payload,
    });
  }

  public async initialize(payload: InitializeParams): Promise<TTrainer> {
    return await this.post<InitializeParams, TTrainer>('trainers', {
      body: payload,
    });
  }
}