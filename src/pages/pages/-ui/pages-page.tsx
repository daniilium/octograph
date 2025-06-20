import { useEffect } from 'react'

import { Page } from '@/shared/model/types'
import { useGlobalContext } from '@/shared/model/global-context'
import { ButtonAsLink } from '@/shared/ui/atoms/ButtonAsLink'
import { MainText } from '@/shared/ui/atoms/MainText'
import { Stack } from '@/shared/ui/templates/Stack'

import { usePageListPagination } from '../-model/use-page-list-pagination'
import PageIcon from '/assets/page.svg'
import { PageContainer } from './page-container'
import { PageLink } from './page-link'

export function PagesPage() {
  const { setHeader } = useGlobalContext()
  const { pages, nextPage, previousPage, currentPage, totalCount } =
    usePageListPagination()

  useEffect(() => {
    setHeader({
      title: `Pages (${totalCount})`,
      subtitle: 'your pages',
    })
  }, [])

  if (pages.length === 0) return <MainText>No pages</MainText>

  return (
    <Stack gap="32px">
      <Stack gap="8px">
        {pages.map((page: Page) => {
          return (
            <PageContainer key={page.path}>
              <img
                style={{ width: '20px', height: '20px' }}
                src={PageIcon}
                alt="Page Icon"
              />
              <PageLink to={`/page/${page.path}`}>{page?.title}</PageLink>

              <MainText>({page.views})</MainText>
            </PageContainer>
          )
        })}
      </Stack>

      <Stack direction="row" align="left" gap="8px">
        <ButtonAsLink onClick={previousPage}>Previous</ButtonAsLink>
        <MainText>{currentPage}</MainText>
        <ButtonAsLink onClick={nextPage}>Next page</ButtonAsLink>
      </Stack>
    </Stack>
  )
}
