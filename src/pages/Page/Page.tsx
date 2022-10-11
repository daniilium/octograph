import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Link, MainText } from '../../components/atoms';
import { Header, Modal } from '../../components/organisms';
import { Stack } from '../../components/templates';
import { cleanupPage, getPage } from '../../services/page';
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

  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const setClearPage = async () => {
    if (!page?.path) return;

    const result = await cleanupPage(page?.path);
    if (!result.ok) alert('error cleanup page');
  };

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

        <Stack align="left">
          <Button onClick={() => setIsOpenConfirmation(true)}>Clear this page</Button>
        </Stack>

        {isOpenConfirmation && (
          <Modal
            setIsOpen={setIsOpenConfirmation}
            title={'Clear page?'}
            text={
              'Clearing the page will result in the loss of data on the page. It will not be possible to undo the action.'
            }
            onClick={setClearPage}
          />
        )}
      </Stack>
    </>
  );
}
