import { useEffect, useState } from 'react';

import { Header, Title, Subtitle } from '../../css-in-js/global';
import { PageObject } from '../../helpers/interfaces';
import { getPageList } from '../../services/page';
import { IconPage } from './components/IconPage';
import {
  PageListContent,
  PageListContainer,
  PageItem,
  PageItemLink,
  PageCount,
  PaginationContainer,
  PaginationButton,
} from './pageList.style';

export const PageList = () => {
  const [pages, setPages] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const pagesOnPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const get = async () => {
      const result = (await getPageList(offset, pagesOnPage))?.result;
      setPages(result.pages);
      setTotalCount(result.total_count);
    };

    get();
  }, [offset]);

  const getNextPage = () => {
    if (currentPage > totalCount / pagesOnPage) return;

    setOffset(offset + pagesOnPage);
    setCurrentPage(currentPage + 1);
  };

  const getPreviousPage = () => {
    if (currentPage <= 1) return;

    setOffset(offset - pagesOnPage);
    setCurrentPage(currentPage - 1);
  };

  const cutTitle = (title: string) => {
    const len = title.length;

    const clientWidth = document.documentElement.clientWidth;
    const workPlace = clientWidth > 730 ? 730 : clientWidth;
    const paddings = 42;
    const iconAndViews = 50;

    const countChar = Math.ceil((workPlace - paddings - iconAndViews) / 9);

    const eclipse = '...';
    if (len > countChar) return title.slice(0, countChar - eclipse.length) + eclipse;
    return title;
  };

  return (
    <>
      <Header>
        <Title>Страницы ({totalCount})</Title>
        <Subtitle>ваши страницы</Subtitle>
      </Header>

      <PageListContent>
        <PageListContainer>
          {pages.map((page: PageObject) => {
            return (
              <PageItem key={page.path}>
                <PageItemLink href={`/page/${page.path}`} target="_blank">
                  <IconPage />
                  <p>{cutTitle(page.title)}</p>
                </PageItemLink>

                <PageCount>({page.views})</PageCount>
              </PageItem>
            );
          })}
        </PageListContainer>

        <PaginationContainer>
          <PaginationButton onClick={getPreviousPage}>{'<'}</PaginationButton>
          <p>{currentPage}</p>
          <PaginationButton onClick={getNextPage}>{'>'}</PaginationButton>
        </PaginationContainer>
      </PageListContent>
    </>
  );
};
