import { useCallback, useMemo, useState } from 'react';

type RequiredFieldsHookResult<TValues extends Record<string, string>> = {
  values: TValues;
  errors: Record<keyof TValues, boolean>;
  hasRequiredErrors: boolean;
  setFieldValue: <TField extends keyof TValues>(field: TField, value: string) => void;
  validateRequiredFields: () => boolean;
};

const createBooleanMap = <TValues extends Record<string, string>>(
  values: TValues,
  defaultValue: boolean,
): Record<keyof TValues, boolean> => {
  const entries = Object.keys(values).map((field) => [field, defaultValue]);

  return Object.fromEntries(entries) as Record<keyof TValues, boolean>;
};

export const useRequiredFields = <TValues extends Record<string, string>>(
  initialValues: TValues,
): RequiredFieldsHookResult<TValues> => {
  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<Record<keyof TValues, boolean>>(() => {
    return createBooleanMap(initialValues, false);
  });

  const hasRequiredErrors = useMemo(() => Object.values(errors).some(Boolean), [errors]);

  const setFieldValue = useCallback(<TField extends keyof TValues>(field: TField, value: string) => {
    setValues((previousState) => ({
      ...previousState,
      [field]: value,
    }));

    if (value.trim()) {
      setErrors((previousState) => ({
        ...previousState,
        [field]: false,
      }));
    }
  }, []);

  const validateRequiredFields = useCallback(() => {
    const nextErrors = Object.entries(values).reduce((accumulator, [field, value]) => {
      return {
        ...accumulator,
        [field]: !value.trim(),
      };
    }, {} as Record<keyof TValues, boolean>);

    setErrors(nextErrors);

    return Object.values(nextErrors).some(Boolean);
  }, [values]);

  return {
    values,
    errors,
    hasRequiredErrors,
    setFieldValue,
    validateRequiredFields,
  };
};

