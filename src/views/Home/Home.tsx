import { Header, Subtitle, Title } from '../../css-in-js/global';

export const Home = () => {
  return (
    <>
      <Header>
        <Title>Главная</Title>
        <Subtitle>удобное управление telegra.ph</Subtitle>
      </Header>

      <article>
        <p>Возможности:</p>
        <ul>
          <li>передача аккаунта</li>
          <li>изменения данных аккаунта</li>
          <li>редактирование статей</li>
        </ul>
      </article>
    </>
  );
};
