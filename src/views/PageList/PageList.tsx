import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageObject } from '../../services/Interfaces';

import { getPageList } from '../../services/page';

export const PagesList = () => {
  const [pages, setPages] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const get = async () => {
      const result = (await getPageList())?.result;
      setPages(result.pages);
      setTotalCount(result.total_count);
    };

    get();
  }, []);

  return (
    <>
      <h1>Pages ({totalCount})</h1>
      <ul>
        {pages.map((page: PageObject, index) => {
          return (
            <Link to={`/page/${page.path}`} key={page.path}>
              <li>
                <p>{page.title}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};
