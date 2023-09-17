import Image from "next/image";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

import { githubProfile, linkedIn } from "../../lib/socials";

const FooterContent = styled("footer")`
  padding: 1.5rem 0;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  background: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.background.paper
      : theme.palette.primary.main};
  box-shadow: 0 -1px 3px rgba(34, 25, 25, 0.4);
  text-align: center;
`;

const Footer: React.FC = () => (
  <FooterContent>
    <Stack>
      <Typography
        align="center"
        color="inherit"
        variant="subtitle1"
        component="span"
        display="flex"
        justifyContent="center"
      >
        © Axel Pettersson 2022&nbsp;
        <a href={linkedIn} target="_blank" rel="noopener noreferrer">
          <Image
            src="/static/images/linkedin_logo.png"
            height={28}
            width={28}
            alt="LinkedIn logo"
          />
        </a>
        &nbsp;
        <a href={githubProfile} target="_blank" rel="noopener noreferrer">
          <Image
            src="/static/images/github_logo.png"
            height={28}
            width={28}
            alt="GitHub logo"
          />
        </a>
      </Typography>
      <Link
        align="center"
        color="inherit"
        variant="subtitle1"
        href="mailto:hello@partiguiden.se"
      >
        hello@partiguiden.se
      </Link>
    </Stack>
  </FooterContent>
);

export default Footer;
