import styled from 'styled-components';

export const blackColor = '#333333';
export const grayColor = '#79828b';
export const redColor = '#CA3737';

export const Text = styled.p`
  font-family: 'Lucida Grande', sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Title = styled.h2`
  font-family: 'Lucida Grande', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 38px;
  color: ${blackColor};
`;

export const Subtitle = styled.h3`
  font-family: 'Lucida Grande', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${grayColor};
`;
