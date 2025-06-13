export const loginFormRules = {
  login: {
    required: { value: true, message: 'login is required' },
    minLength: { value: 60, message: 'min length 60 characters' },
    maxLength: { value: 60, message: 'max length 60 characters' },
  },
}
