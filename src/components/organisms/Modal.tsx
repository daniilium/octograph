import { useState } from 'react';
import styled from 'styled-components';

import { colors } from '../../theme';
import { Button, Title, MainText } from '../atoms';
import { Container, Group, Stack } from '../templates';

interface Props {
  show: boolean;
  title: string;
  text: string;
  onClick(): void;
}

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  background-color: transparent;
  border: none;
  width: 26px;
  height: 26px;

  &:hover {
    color: white;
    background-color: ${colors.gray}50;
  }
`;

const Wrapper = styled.div`
  background-color: ${colors.black};
  opacity: 0.1;
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
  box-shadow: 6px 12px 20px ${colors.black};
`;

export function Modal(props: Props) {
  const [show, setShow] = useState(props.show);
  const cssNone = { display: 'none' };
  const cssBlock = { display: 'block' };
  const setVisible = () => (show ? cssBlock : cssNone);
  const close = () => setShow(false);

  return (
    <>
      <Wrapper style={setVisible()} onClick={close}></Wrapper>
      <ModalContainer style={setVisible()} size="200px">
        <Stack gap="16px">
          <Title>{props.title}</Title>
          <MainText>{props.text}</MainText>

          <CloseButton onClick={close}>×</CloseButton>
          <Group grow position="apart">
            <Button onClick={props.onClick}>Copy</Button>
          </Group>
        </Stack>
      </ModalContainer>
    </>
  );
}
