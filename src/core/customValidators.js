export const showError = (input, errorName) => {
  return input?.errors?.[errorName] && input?.isDirty;
};