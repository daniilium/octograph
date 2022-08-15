import styled from 'styled-components';
import { blackColor, grayColor, redColor } from '../../css-in-js/global';

export const Button = styled.button`
  margin-top: 16px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  padding: 8px 16px 6px 16px;
  background-color: white;
  border: 2px solid ${blackColor};
  border-radius: 18px;
  text-transform: uppercase;
`;

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 64px;
`;

export const InputContainer = styled.div`
  width: 100%;
`;

export const EmptySpace = styled.div`
  height: 100%;
`;

export const InformationPin = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${grayColor};

  &:before {
    content: '•';
    margin-right: 4px;
  }
`;

export const ErrorPin = styled(InformationPin)`
  color: ${redColor};
`;

export const PinContainer = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
