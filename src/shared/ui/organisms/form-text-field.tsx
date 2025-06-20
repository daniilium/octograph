import {
  FieldError,
  useController,
  UseControllerProps,
  FieldValues,
} from 'react-hook-form'

import { Label } from '@/shared/ui/atoms/Label'
import { Stack } from '@/shared/ui/templates/stack'
import { ErrorPin } from '@/shared/ui/atoms/ErrorPin'
import { Input } from '@/shared/ui/molecules/input'

type Props<T extends FieldValues> = {
  label?: string
  placeholder?: string
  error?: FieldError
} & UseControllerProps<T>

export const FormTextField = <T extends FieldValues>(props: Props<T>) => {
  const { label, placeholder, error } = props

  const { field } = useController(props)

  return (
    <Label>
      <Stack>
        {label}

        <Input
          type="text"
          placeholder={placeholder}
          error={error}
          defaultValue={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          ref={field.ref}
        />

        {error && <ErrorPin>{error.message}</ErrorPin>}
      </Stack>
    </Label>
  )
}
