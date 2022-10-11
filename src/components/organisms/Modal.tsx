import styled from 'styled-components';

import { colors } from '../../theme';
import { Button, Title, MainText } from '../atoms';
import { Container, Group, Stack } from '../templates';

interface Props {
  setIsOpen(state: boolean): void;
  title: string;
  text: string;
  onClick(): void;
}

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  background-color: white;
  border: none;
  width: 26px;
  height: 26px;

  &:hover {
    font-weight: bold;
    font-size: 16px;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  position: absolute;
  top: 0;
  left: 0;
`;

const ModalContainer = styled(Container)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 1px solid ${colors.black};
  border-radius: 18px;
  background-color: white;

  padding: 16px 24px 8px 24px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export function Modal(props: Props) {
  const { setIsOpen, title, text, onClick } = props;
  const close = () => setIsOpen(false);

  return (
    <Wrapper onClick={close}>
      <ModalContainer size="300px">
        <Stack gap="16px">
          <Title>{title}</Title>
          <MainText>{text}</MainText>

          <CloseButton onClick={close}>×</CloseButton>
          <Group grow position="apart">
            <Button onClick={close}>No</Button>
            <Button onClick={onClick}>Yes</Button>
          </Group>
        </Stack>
      </ModalContainer>
    </Wrapper>
  );
}
