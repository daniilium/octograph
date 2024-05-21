import { useController, UseControllerProps } from 'react-hook-form';
import styled from 'styled-components';

import { colors, fonts } from '@/config/theme';

import { ErrorPin, Label } from '@/components/atoms';
import { Stack } from '@/components/templates';

const Input = styled.input<{ isError?: boolean }>`
  border: 1px solid ${(props) => (props.isError ? colors.red : colors.black)};
  border-radius: 18px;
  font-family: ${fonts.main};
  font-size: 18px;
  padding: 0 12px;
  height: 36px;

  &:focus {
    border: 2px solid ${(props) => (props.isError ? colors.red : colors.black)};
    outline: none;
  }
`;

type Props = {
  label?: string;
  placeholder?: string;
  error?: any;
} & UseControllerProps<any>;

export const FormTextField = (props: Props) => {
  const { label, placeholder, error } = props;
  const isError = Boolean(error);

  const { field } = useController(props);

  return (
    <Label>
      <Stack>
        {label}
        <Input
          type="text"
          placeholder={placeholder}
          isError={isError}
          defaultValue={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          ref={field.ref}
        />

        {error && <ErrorPin>{error.message || JSON.stringify(error)}</ErrorPin>}
      </Stack>
    </Label>
  );
};
