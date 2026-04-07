'use client';

import Link from 'next/link';
import React, { useActionState, useEffect, useRef } from 'react';

import { loginAction } from '@/app/actions/auth';
import { useAlert } from '@/app/ui/components/alert';
import { useLoading } from '@/app/ui/components/loading';

import AuthField from '../field/AuthField';
import AuthSubmitButton from '../button/AuthSubmitButton';
import { PASSWORD_PATTERN } from '../../constants';
import { INITIAL_AUTH_ACTION_STATE } from '../../types';
import { useRequiredFields } from '../useRequiredFields';
import '../AuthForm.scss';

type LoginField = 'email' | 'password';
type LoginValues = Record<LoginField, string>;

const COPY = {
  title: 'Login',
  subtitle: 'Use your credentials to access the system.',
  passwordHint: 'Use at least 7 characters, one uppercase letter, and one special character.',
  email: 'Email',
  password: 'Password',
  submit: 'Sign in',
  submitting: 'Signing in...',
  registerPrompt: 'Do not have an account?',
  registerLink: 'Create one',
  requiredFieldsWarning: 'Please fill all required fields.',
};

const INITIAL_VALUES: LoginValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [state, action] = useActionState(loginAction, INITIAL_AUTH_ACTION_STATE);
  const lastServerMessageRef = useRef('');
  const { showAlert } = useAlert();
  const { startPageLoading, stopPageLoading } = useLoading();
  const { values, errors, setFieldValue, validateRequiredFields } =
    useRequiredFields<LoginValues>(INITIAL_VALUES);

  useEffect(() => {
    if (!state.message || state.message === lastServerMessageRef.current) {
      return;
    }

    // Stop loading when state changes (success or error)
    stopPageLoading();

    showAlert({
      type: state.status === 'error' ? 'error' : 'success',
      message: state.message,
    });

    lastServerMessageRef.current = state.message;
  }, [showAlert, state.message, state.status, stopPageLoading]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const hasErrors = validateRequiredFields();

    if (hasErrors) {
      event.preventDefault();

      showAlert({
        type: 'warning',
        message: COPY.requiredFieldsWarning,
      });

      return;
    }

    // Start loading when form is submitted
    startPageLoading();
  };

  return (
    <section className='auth-page' aria-label='login-page'>
      <article className='auth-card'>
        <h1 className='auth-card__title'>{COPY.title}</h1>
        <p className='auth-card__subtitle'>{COPY.subtitle}</p>

        <form action={action} className='auth-form' noValidate onSubmit={handleSubmit}>
          <AuthField htmlFor='email' label={COPY.email} hasError={errors.email}>
            <input
              id='email'
              name='email'
              type='email'
              className={`auth-form__input ${errors.email ? 'auth-form__input--error' : ''}`}
              required
              value={values.email}
              aria-invalid={errors.email}
              onChange={(event) => setFieldValue('email', event.target.value)}
            />
          </AuthField>

          <AuthField htmlFor='password' label={COPY.password} hasError={errors.password}>
            <input
              id='password'
              name='password'
              type='password'
              className={`auth-form__input ${errors.password ? 'auth-form__input--error' : ''}`}
              required
              minLength={7}
              pattern={PASSWORD_PATTERN}
              title={COPY.passwordHint}
              value={values.password}
              aria-invalid={errors.password}
              onChange={(event) => setFieldValue('password', event.target.value)}
            />
          </AuthField>

          <AuthSubmitButton label={COPY.submit} loadingLabel={COPY.submitting} />
        </form>

        <p className='auth-card__footer'>
          {COPY.registerPrompt} <Link href='/register'>{COPY.registerLink}</Link>
        </p>
      </article>
    </section>
  );
};

export default React.memo(LoginForm);
