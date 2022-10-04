import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Link, MainText } from '../../components/atoms';
import { Header } from '../../components/organisms';
import { Stack } from '../../components/templates';
import { getPage } from '../../services/page';
import { PageObject } from '../../services/types';

export function Page() {
  const { id } = useParams();
  const [page, setPage] = useState<PageObject>();

  useEffect(() => {
    if (!id) return;

    const get = async () => {
      const page = await getPage(id);
      if (!page.ok) {
        alert('error load page');
        return;
      }

      setPage(page.result);
    };

    get();
  }, [id]);

  // const cutTitle = (title: string | undefined): string => {
  //   if (!title) return '';
  //   const len = title.length;

  //   const clientWidth = document.documentElement.clientWidth;
  //   const workPlace = clientWidth > 730 ? 730 : clientWidth;
  //   const paddings = 42;

  //   const countChar = Math.ceil((workPlace - paddings) / 18);

  //   const eclipse = '...';
  //   if (len > countChar) return title.slice(0, countChar - eclipse.length) + eclipse;
  //   return title;
  // };

  console.log(page);

  return (
    <>
      <Header title={page?.title || 'empty'} subtitle={`Просмотров: ${page?.views}`} />

      <Stack gap="8px">
        <MainText>
          <b>Author name:</b> {page?.author_name}
        </MainText>
        <MainText>
          <b>Author url:</b> {page?.author_url}
        </MainText>
        <MainText>
          <b>Description:</b> {page?.description}
        </MainText>
        <Link href={page?.url} target="_blank">
          Open this page in a new window
        </Link>
      </Stack>
    </>
  );
}
