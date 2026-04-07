import React from 'react';

import { REQUIRED_FIELD_MESSAGE } from '../../constants';

type AuthFieldProps = {
  htmlFor: string;
  label: string;
  hasError: boolean;
  children: React.ReactNode;
};

const AuthField = ({ htmlFor, label, hasError, children }: AuthFieldProps) => {
  return (
    <div className='auth-form__row'>
      <label htmlFor={htmlFor} className={`auth-form__label ${hasError ? 'auth-form__label--error' : ''}`}>
        {label}
      </label>
      {children}
      {hasError && <small className='auth-form__error'>{REQUIRED_FIELD_MESSAGE}</small>}
    </div>
  );
};

export default React.memo(AuthField);

