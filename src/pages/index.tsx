import { Header } from '@/shared/ui/organisms'
import { MainText } from '@/shared/ui/atoms'

export const Route = createFileRoute({
  component: Index,
})

function Index() {
  return (
    <>
      <Header title="Home" subtitle="management telegra.ph" />

      <article>
        <MainText>Site functionality:</MainText>
        <MainText>• Changing account data</MainText>
        <MainText>• Sign in link</MainText>
        <MainText>• View created pages</MainText>
        <MainText>• Cleaning the page of content</MainText>
      </article>
    </>
  )
}
