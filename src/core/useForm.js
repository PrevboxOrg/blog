import { useState, useEffect } from 'react';

export const useForm = (inputs) => {
  const [formValue, setFormValue] = useState(inputs);
  const [isFormValid, setIsFormValid] = useState(false);

  const updateInputValue = (inputName, newValue) => {
    const input = formValue[inputName];
    input.value = newValue;
    input.isDirty = true;

    for (const inputName in formValue) {
      if (Object.hasOwnProperty.call(formValue, inputName)) {
        updateInputError(formValue[inputName]);
      }
    }

    updateFormValidity();

    if (input.onChange) {
      input.onChange(newValue);
    }

    setFormValue({ ...formValue, [inputName]: input });
  };

  const updateFormValidity = () => {
    for (const inputName of Object.keys(formValue)) {
      const input = { ...formValue[inputName] };

      for (const inputErrorName of Object.keys(input.errors)) {
        if (input.errors[inputErrorName]) {
          setIsFormValid(false);
          return;
        }
      }
    }

    setIsFormValid(true);
  };

  const updateInputError = (input) => {
    if (!input.errors) {
      input.errors = {};
    }

    input.errors['required'] = input.isRequired && !input.value;

    if (input.customValidators && input.customValidators.length) {
      for (const validator of input.customValidators) {
        const { errorName, isNotValid } = validator(input.value);
        input.errors[errorName] = isNotValid;
      }
    }
  };

  const updateInputValidity = (inputName, validityName, isNotValid) => {
    const input = formValue[inputName];
    if (!input.errors) {
      input.errors = {};
    }

    input.isDirty = true;
    input.errors[validityName] = isNotValid;

    setFormValue({ ...formValue, [inputName]: input });

    updateFormValidity();
  };

  return [formValue, isFormValid, updateInputValue, updateInputValidity];
};
