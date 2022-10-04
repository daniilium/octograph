import { Header } from '../../components/organisms';
import { MainText } from '../../components/atoms';

export const Home = () => {
  return (
    <>
      <Header title="Home" subtitle="management telegra.ph" />

      <article>
        <MainText>Site functionality:</MainText>
        <MainText>• Changing account data</MainText>
        <MainText>• Sign in link</MainText>
      </article>
    </>
  );
};
