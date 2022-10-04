import copy from 'copy-to-clipboard';
import { InfoPin, ButtonAsLink } from '../../components/atoms';

import { Header } from '../../components/organisms';
import { Stack } from '../../components/templates';
import { getToken, revokeToken } from '../../services/token';

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

  return (
    <>
      <Header title="Warning" subtitle="Management token" />

      <Stack gap="16px">
        <Stack>
          <ButtonAsLink onClick={copyToken}>Copy token</ButtonAsLink>
          <InfoPin>
            transferring the token to third parties may result in the loss of account management
          </InfoPin>
        </Stack>

        <Stack>
          <ButtonAsLink onClick={copyLink}>Copy the login link</ButtonAsLink>
          <InfoPin>contains a token in the link</InfoPin>
        </Stack>

        <Stack>
          <ButtonAsLink onClick={revokeToken}>Revoke token</ButtonAsLink>
          <InfoPin>old tokens and links will stop working</InfoPin>
        </Stack>
      </Stack>
    </>
  );
}
