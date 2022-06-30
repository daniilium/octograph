import { SyntheticEvent, useRef } from 'react';

import { createAccount, getAccountByToken } from '../../services/account';

export const Authorization = () => {
  const shortNameRef = useRef<HTMLInputElement>(null);
  const tokenRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const tokenInput = tokenRef.current as HTMLInputElement;
    const shortNameInput = shortNameRef.current as HTMLInputElement;

    const token = tokenInput.value;
    const shortName = shortNameInput.value;

    if (token) getAccountByToken(token);
    if (shortName) createAccount(shortName);
  };

  return (
    <>
      <h1>Authorization</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <p>Авторизация по токену</p>
          <input ref={tokenRef} type="text" placeholder="token 60 length" />
        </label>

        <label>
          <p>Регистрация</p>
          <input ref={shortNameRef} type="text" placeholder="short name 1-32 length" />
        </label>
        <br />
        <button>Авторизация/Регистрация</button>
      </form>
    </>
  );
};
