'use client';

import Link from 'next/link';
import React, { useActionState, useEffect, useRef } from 'react';

import { registerAction } from '@/app/actions/auth';
import { useAlert } from '@/app/ds/alert';
import { useLoading } from '@/app/ds/loading';

import AuthField from '../field/AuthField';
import AuthSubmitButton from '../button/AuthSubmitButton';
import { PASSWORD_PATTERN } from '../../constants';
import { INITIAL_AUTH_ACTION_STATE } from '../../types';
import { useRequiredFields } from '../useRequiredFields';
import '../AuthForm.scss';
import { useRouter } from 'next/navigation';

type RegisterFormProps = {
  showLoginShortcut?: boolean;
};

type RegisterField = 'email' | 'fullName' | 'birthDate' | 'gender' | 'password' | 'confirmPassword';
type RegisterValues = Record<RegisterField, string>;

const COPY = {
  title: 'User Register',
  subtitle: 'Fill in the information to create your account.',
  passwordHint: 'Use at least 7 characters, one uppercase letter, and one special character.',
  email: 'Email',
  fullName: 'Full name',
  birthDate: 'Birth date',
  gender: 'Gender',
  password: 'Password',
  confirmPassword: 'Confirm password',
  submit: 'Create account',
  submitting: 'Creating account...',
  loginPrompt: 'Already have an account?',
  loginLink: 'Sign in',
  requiredFieldsWarning: 'Please fill all required fields.',
};

const INITIAL_VALUES: RegisterValues = {
  email: '',
  fullName: '',
  birthDate: '',
  gender: '',
  password: '',
  confirmPassword: '',
};

const RegisterForm = ({ showLoginShortcut = true }: RegisterFormProps) => {
  const [state, action] = useActionState(registerAction, INITIAL_AUTH_ACTION_STATE);
  const router = useRouter();
  const lastServerMessageRef = useRef('');
  const { showAlert } = useAlert();
  const { startPageLoading, stopPageLoading } = useLoading();
  const { values, errors, setFieldValue, validateRequiredFields } =
    useRequiredFields<RegisterValues>(INITIAL_VALUES);

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

    startPageLoading();
    router.push('/login');
  };

  return (
    <section className='auth-page' aria-label='register-page'>
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
              aria-invalid={errors.email}
              value={values.email}
              onChange={(event) => setFieldValue('email', event.target.value)}
            />
          </AuthField>

          <AuthField htmlFor='fullName' label={COPY.fullName} hasError={errors.fullName}>
            <input
              id='fullName'
              name='fullName'
              type='text'
              className={`auth-form__input ${errors.fullName ? 'auth-form__input--error' : ''}`}
              required
              aria-invalid={errors.fullName}
              value={values.fullName}
              onChange={(event) => setFieldValue('fullName', event.target.value)}
            />
          </AuthField>

          <AuthField htmlFor='birthDate' label={COPY.birthDate} hasError={errors.birthDate}>
            <input
              id='birthDate'
              name='birthDate'
              type='date'
              className={`auth-form__input ${errors.birthDate ? 'auth-form__input--error' : ''}`}
              required
              aria-invalid={errors.birthDate}
              value={values.birthDate}
              onChange={(event) => setFieldValue('birthDate', event.target.value)}
            />
          </AuthField>

          <AuthField htmlFor='gender' label={COPY.gender} hasError={errors.gender}>
            <select
              id='gender'
              name='gender'
              className={`auth-form__select ${errors.gender ? 'auth-form__input--error' : ''}`}
              required
              aria-invalid={errors.gender}
              value={values.gender}
              onChange={(event) => setFieldValue('gender', event.target.value)}
            >
              <option value='' disabled>
                Select
              </option>
              <option value='FEMALE'>Female</option>
              <option value='MALE'>Male</option>
              <option value='OTHER'>Other</option>
            </select>
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
              aria-invalid={errors.password}
              value={values.password}
              onChange={(event) => setFieldValue('password', event.target.value)}
            />
            <small>{COPY.passwordHint}</small>
          </AuthField>

          <AuthField htmlFor='confirmPassword' label={COPY.confirmPassword} hasError={errors.confirmPassword}>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              className={`auth-form__input ${errors.confirmPassword ? 'auth-form__input--error' : ''}`}
              required
              minLength={7}
              aria-invalid={errors.confirmPassword}
              value={values.confirmPassword}
              onChange={(event) => setFieldValue('confirmPassword', event.target.value)}
            />
          </AuthField>

          <AuthSubmitButton label={COPY.submit} loadingLabel={COPY.submitting} />
        </form>

        {showLoginShortcut && (
          <p className='auth-card__footer'>
            {COPY.loginPrompt} <Link href='/login'>{COPY.loginLink}</Link>
          </p>
        )}
      </article>
    </section>
  );
};

export default React.memo(RegisterForm);
