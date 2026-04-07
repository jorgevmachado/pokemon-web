'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

type AuthSubmitButtonProps = {
  label: string;
  loadingLabel: string;
};

/**
 * Submit button that shows loading state during form submission.
 * Note: This component only handles UI feedback (button disabled + label).
 * The actual loading API (startLoading/stopLoading) is managed by the parent form.
 */
const AuthSubmitButton = ({
  label,
  loadingLabel,
}: AuthSubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button type='submit' className='auth-form__submit' disabled={pending}>
      {pending ? loadingLabel : label}
    </button>
  );
};

export default React.memo(AuthSubmitButton);
