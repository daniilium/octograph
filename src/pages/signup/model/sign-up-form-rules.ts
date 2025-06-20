export const signUpFormRules = {
  shortName: {
    required: { value: true, message: 'short name is required' },
    minLength: { value: 1, message: 'min length 1 characters' },
    maxLength: { value: 32, message: 'max length 6032 characters' },
  },
}
