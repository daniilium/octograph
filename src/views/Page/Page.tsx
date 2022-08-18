import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Header, Title, Subtitle, Link } from '../../css-in-js/global';
import { PageObject } from '../../helpers/interfaces';
import { getPage } from '../../services/page';

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  word-break: break-all;
`;

const PageItemTitle = styled.span`
  font-weight: 600;
  padding-right: 8px;
`;

export function Page() {
  const pathPage = useParams().id;
  const [page, setPage] = useState<PageObject | null>(null);

  useEffect(() => {
    if (!pathPage) return;

    const get = async () => {
      const page = await getPage(pathPage);
      if (page.ok) setPage(page.result);
    };

    get();
  }, [pathPage]);

  const cutTitle = (title: string | undefined) => {
    if (!title) return;
    const len = title.length;

    const clientWidth = document.documentElement.clientWidth;
    const workPlace = clientWidth > 730 ? 730 : clientWidth;
    const paddings = 42;

    const countChar = Math.ceil((workPlace - paddings) / 18);

    const eclipse = '...';
    if (len > countChar) return title.slice(0, countChar - eclipse.length) + eclipse;
    return title;
  };

  return (
    <>
      <Header>
        <Title>{cutTitle(page?.title)}</Title>
        <Subtitle>Просмотров: {page?.views}</Subtitle>
      </Header>

      <PageContent>
        <p>
          <PageItemTitle>title:</PageItemTitle>
          {page?.title}
        </p>

        <p>
          <PageItemTitle>author_name:</PageItemTitle>
          {page?.author_name}
        </p>

        <p>
          <PageItemTitle>author_url:</PageItemTitle>
          {page?.author_url}
        </p>

        <p>
          <PageItemTitle>description:</PageItemTitle>
          {page?.description}
        </p>

        <p>
          <PageItemTitle>link:</PageItemTitle>
          <Link href={page?.url} target="_blank">
            {page?.path}
          </Link>
        </p>
      </PageContent>
    </>
  );
}
