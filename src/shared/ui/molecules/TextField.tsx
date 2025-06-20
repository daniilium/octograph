import { FieldError, RefCallBack } from 'react-hook-form'

import { Label } from '@/shared/ui/atoms/Label'
import { Stack } from '@/shared/ui/templates/Stack'
import { Input } from './input'
import { ChangeEvent } from 'react'

type Props = {
  label?: string
  placeholder?: string
  onChange?(value: string): void
  onBlur?(): void
  inputRef?: RefCallBack

  value?: string
  error?: FieldError | undefined
}

export const TextField = (props: Props) => {
  const { label, placeholder, onChange, onBlur, inputRef, error } = props

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <Label>
      <Stack>
        {label}

        <Input
          type="text"
          placeholder={placeholder}
          ref={inputRef}
          onChange={handleChange}
          onBlur={onBlur}
          error={error}
        />
      </Stack>
    </Label>
  )
}
