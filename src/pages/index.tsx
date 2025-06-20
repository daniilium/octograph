import { useGlobalContext } from '@/shared/model/global-context'
import { MainText } from '@/shared/ui/atoms/MainText'

import { useEffect } from 'react'

export const Route = createFileRoute({
  component: IndexPage,
})

function IndexPage() {
  const { setHeader } = useGlobalContext()

  useEffect(() => {
    setHeader({
      title: 'Home',
      subtitle: 'management telegra.ph',
    })
  }, [])

  return (
    <>
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
