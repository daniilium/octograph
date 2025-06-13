import { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'

import PageIcon from '/assets/page.svg'

import { ButtonAsLink, Link, MainText } from '@/shared/ui/atoms'
import { Header } from '@/shared/ui/organisms'
import { Stack } from '@/shared/ui/templates'

import { Page } from '@/shared/model/types'
import { getPageList } from '../api/getPageList'
import { useLocalStorage } from '@/shared/lib/useLocalStorage'

const PageContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const PageLink = styled(Link)`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const initialState = { currentPage: 1, pagesOnPage: 20, totalCount: 0 }
function reducer(
  state: typeof initialState,
  action: { type: 'next' | 'previous' | 'setTotalCount'; payload?: number }
) {
  const { currentPage, pagesOnPage, totalCount } = state

  switch (action.type) {
    case 'next':
      if (currentPage > totalCount / pagesOnPage) return state
      return { ...state, currentPage: currentPage + 1 }
    case 'previous':
      if (currentPage === 1) return state
      return { ...state, currentPage: currentPage - 1 }
    case 'setTotalCount':
      return { ...state, totalCount: action?.payload || 0 }
    default:
      throw new Error()
  }
}

const getPage = async (page: number, limit = 20) => {
  return await getPageList(page * limit - limit, limit)
}

export function PageList() {
  const [pages, setPages] = useState<Page[]>()
  const [localPageNumber, setLocalPageNumber] = useLocalStorage('pageNumber', 1)

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    currentPage: localPageNumber,
  })
  const getNextPage = () => dispatch({ type: 'next' })
  const getPreviousPage = () => dispatch({ type: 'previous' })
  const setTotalCount = (count: number) =>
    dispatch({ type: 'setTotalCount', payload: count })

  useEffect(() => {
    const get = async () => {
      const pages = await getPage(state.currentPage)
      if (!pages.ok) {
        alert('Error: get pages')
        return
      }

      const result = pages.result
      setPages(result.pages)
      setTotalCount(result.total_count)
      setLocalPageNumber(state.currentPage)
    }

    get()

    // localPageNumber in deps invoke re-load page data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPage])

  return (
    <>
      <Header title={`Pages (${state.totalCount})`} subtitle="your pages" />

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
          <ButtonAsLink onClick={getPreviousPage}>Previous</ButtonAsLink>
          <MainText>{state.currentPage}</MainText>
          <ButtonAsLink onClick={getNextPage}>Next page</ButtonAsLink>
        </Stack>
      </Stack>
    </>
  )
}
