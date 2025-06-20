import { MainText } from '../atoms/MainText'

export const ListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainText style={{ paddingLeft: 16, fontSize: 14 }}>{children}</MainText>
  )
}
