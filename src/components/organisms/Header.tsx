import { Subtitle } from '../atoms/Subtitle';
import { Title } from '../atoms/Title';

interface Props {
  title: string;
  subtitle: string;
}
export const Header = (props: Props) => {
  const { title, subtitle } = props;

  return (
    <header>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </header>
  );
};
