import { Header, Subtitle, Title } from '../../css-in-js/global';

export const Home = () => {
  return (
    <>
      <Header>
        <Title>Главная</Title>
        <Subtitle>управление telegra.ph</Subtitle>
      </Header>

      <article>
        <p>Функции сайта:</p>
        <p>• Ссылка для входа</p>
        <p>• Изменение и управление аккаунтом</p>
      </article>
    </>
  );
};
