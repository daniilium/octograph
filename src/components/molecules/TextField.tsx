import { FieldError, RefCallBack } from 'react-hook-form';
import styled from 'styled-components';

import { colors, fonts } from '@/config/theme';
import { Label } from '../atoms';
import { Stack } from '../templates';

const Input = styled.input<{ error: boolean }>`
  border: 1px solid ${(props) => (props.error ? colors.red : colors.black)};
  border-radius: 18px;
  font-family: ${fonts.main};
  font-size: 18px;
  padding: 0 12px;
  height: 36px;

  &:focus {
    border: 2px solid ${(props) => (props.error ? colors.red : colors.black)};
    outline: none;
  }
`;

type Props = {
  label?: string;
  placeholder?: string;
  onChange?(value: any): void;
  onBlur?(): void;
  inputRef?: RefCallBack;
  // initValue?: string;
  value?: string;
  error?: FieldError | undefined;
};

export const TextField = (props: Props) => {
  const { label, placeholder, onChange, onBlur, inputRef, error } = props;

  return (
    <Label>
      <Stack>
        {label}
        <Input
          type="text"
          placeholder={placeholder}
          ref={inputRef}
          onChange={onChange}
          // value={value}
          onBlur={onBlur}
          error={Boolean(error)}
        />
      </Stack>
    </Label>
  );
};
