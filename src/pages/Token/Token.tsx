import copy from 'copy-to-clipboard';
import { useState } from 'react';

import CopyIcon from "/assets/copy.svg";
import RevokeIcon from '/assets/revoke.svg';

import { InfoPin, ButtonAsLink } from '@/components/atoms';
import { Header, Modal } from '@/components/organisms';
import { Stack } from '@/components/templates';
import { getToken, revokeToken } from '@/services/token';

export function Token() {
  const copyToken = () => {
    const token = getToken();
    if (token) copy(token);
    return;
  };

  const copyLink = () => {
    const token = getToken();
    const link = `${window.location.origin}/login/${token}`;
    if (token) copy(link);
    return;
  };

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Header title="Warning" subtitle="Management token" />

      <Stack gap="16px">
        <Stack>
          <ButtonAsLink onClick={copyToken}>
            <img style={{ width: "16px", height: "16px" }} src={CopyIcon} alt="Copy Icon" />
            Copy token
          </ButtonAsLink>
          <InfoPin>
            transferring the token to third parties may result in the loss of account management
          </InfoPin>
        </Stack>

        <Stack>
          <ButtonAsLink onClick={copyLink}>
            <img style={{ width: "16px", height: "16px" }} src={CopyIcon} alt="Copy Icon" />
            Copy the login link
          </ButtonAsLink>
          <InfoPin>contains a token in the link</InfoPin>
        </Stack>

        <Stack>
          <ButtonAsLink onClick={() => setIsOpenModal(true)}>
            <img style={{ width: "16px", height: "16px" }} src={RevokeIcon} alt="Revoke Icon" />
            Revoke token
          </ButtonAsLink>
          <InfoPin>old tokens and links will stop working</InfoPin>
        </Stack>

        {isOpenModal && (
          <Modal
            setIsOpen={setIsOpenModal}
            title={'Revoke token?'}
            text={
              "Are you sure you want to revoke the token? This will change the token to a new one, so the login links will change. Don't forget to save the new token."
            }
            onClick={revokeToken}
          />
        )}
      </Stack>
    </>
  );
}
