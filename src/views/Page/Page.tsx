import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PageObject } from '../../helpers/interfaces';
import { getPage } from '../../services/page';

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

  return (
    <>
      <p>views: {page?.views}</p>
      <h1>{page?.title}</h1>
      <address>
        <span>author name:</span> {page?.author_name}
        <br />
        <span>author url:</span> {page?.author_url}
      </address>
      <p>{page?.description}</p>
      <a href={page?.url}>{page?.path}</a>
    </>
  );
}
