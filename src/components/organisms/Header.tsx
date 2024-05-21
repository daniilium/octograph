import { Title, Subtitle } from '@/components/atoms';

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
