export const profileFormRules = {
  shortName: {
    required: { value: true, message: 'short name is required' },
    maxLength: { value: 32, message: 'max length 32 characters' },
  },
  authorName: {
    maxLength: { value: 128, message: 'max length 128 characters' },
  },
  authorUrl: {
    maxLength: { value: 512, message: 'max length 512 characters' },
    validate: {
      test: (value: string) => {
        if (!value.length) return true

        return (
          value.startsWith('http://') ||
          value.startsWith('https://') ||
          value.startsWith('mailto:') ||
          'wrong start of input'
        )
      },
    },
  },
}
