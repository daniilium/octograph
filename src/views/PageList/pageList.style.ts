import styled from "styled-components";
import { Link } from "../../css-in-js/global";

import { Button } from '../Profile/Profile.style';

export const PageListContainer = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`;

export const PageListContent = styled.div`
flex-grow: 1;

display: flex;
flex-direction: column;
justify-content: space-between;
`;

export const PageItem = styled.div`
display: flex;
`;

export const PageItemLink = styled(Link)`
display: flex;
gap: 8px;
`;

export const PageCount = styled.p`
margin-left: auto;
color: black;
text-decoration: none;
`;

export const PaginationContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 16px;
`;

export const PaginationButton = styled(Button)`
font-family: 'EB Garamond', serif;
font-size: 22px;
`;
