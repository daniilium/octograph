import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Header, Title, Subtitle } from '../../css-in-js/global';
import { PageObject } from '../../helpers/interfaces';
import { getPageList } from '../../services/page';

export const PageList = () => {
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
      <Header>
        <Title>Статьи ({totalCount})</Title>
        <Subtitle>ваши статьи</Subtitle>
      </Header>

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
