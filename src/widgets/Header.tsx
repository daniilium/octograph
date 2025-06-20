import { useGlobalContext } from '@/shared/model/global-context'
import { Subtitle } from '@/shared/ui/atoms/Subtitle'
import { Title } from '@/shared/ui/atoms/Title'

export const Header = () => {
  const { title, subtitle } = useGlobalContext()

  return (
    <header>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </header>
  )
}
