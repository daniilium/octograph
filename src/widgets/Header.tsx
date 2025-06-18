import { useGlobalContext } from '@/shared/model/global-context'
import { Title, Subtitle } from '@/shared/ui/atoms'

export const Header = () => {
  const { title, subtitle } = useGlobalContext()

  return (
    <header>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </header>
  )
}
