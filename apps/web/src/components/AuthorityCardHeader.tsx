import type { AuthorityEntry } from "../types/authority";
import { darken, styled } from "@mui/material/styles";

const Header = styled("div", {
  shouldForwardProp: (props) => props !== "authorityColor",
})<{
  authorityColor: string;
}>`
  background-color: ${({ theme, authorityColor }) =>
    theme.palette.mode === "dark"
      ? darken(authorityColor, 0.6)
      : authorityColor};
  width: 100%;
  text-align: left;
  padding: 0.25rem 1rem;
`;

const HeaderTitle = styled("span")`
  font-size: 1.15rem;
  color: #ffffff;
`;

interface Props {
  authority: AuthorityEntry;
}

const AuthorityCardHeader: React.FC<Props> = ({ authority }) => (
  <Header authorityColor={authority.color}>
    <HeaderTitle>{authority.desc}</HeaderTitle>
  </Header>
);

export default AuthorityCardHeader;
