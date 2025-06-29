import { Button } from '@/shared/ui/atoms/button'
import { MainText } from '@/shared/ui/atoms/main-text'
import { Title } from '@/shared/ui/atoms/title'
import { Stack } from '@/shared/ui/templates/stack'

import { CloseButton } from './close-button'
import { Group } from './group'
import { ModalContainer } from './modal-container'
import { Wrapper } from './wrapper'

interface Props {
  setIsOpen(state: boolean): void
  title: string
  text: string
  onClick(): void
}

export function ModalDialog(props: Props) {
  const { setIsOpen, title, text, onClick } = props
  const close = () => setIsOpen(false)

  return (
    <Wrapper onClick={close}>
      <ModalContainer size="300px">
        <Stack gap="16px">
          <Title>{title}</Title>
          <MainText>{text}</MainText>

          <CloseButton onClick={close}>×</CloseButton>
          <Group position="apart">
            <Button onClick={close}>No</Button>
            <Button onClick={onClick}>Yes</Button>
          </Group>
        </Stack>
      </ModalContainer>
    </Wrapper>
  )
}
