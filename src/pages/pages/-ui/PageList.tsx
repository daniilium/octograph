import styled from 'styled-components'

import PageIcon from '/assets/page.svg'

import { ButtonAsLink, Link, MainText } from '@/shared/ui/atoms'
import { Header } from '@/shared/ui/organisms'
import { Stack } from '@/shared/ui/templates'

import { Page } from '@/shared/model/types'
import { usePageListPagination } from '../-model/use-page-list-pagination'

const PageContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  height: 28px;
`

const PageLink = styled(Link)`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export function PageList() {
  const { pages, nextPage, previousPage, currentPage, totalCount } =
    usePageListPagination()

  return (
    <>
      <Header title={`Pages (${totalCount})`} subtitle="your pages" />

      <Stack gap="32px">
        <Stack gap="8px">
          {pages &&
            pages.map((page: Page) => {
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
    </>
  )
}
