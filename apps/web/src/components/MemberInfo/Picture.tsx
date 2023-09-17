import Image from "next/image";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";

import { PARTY_LOGOS_LOW_RES } from "../../assets/logos";
import type { PartyAbbreviation } from "../../utils/parties";

const stringToColor = (string: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
};

interface MemberAvatarProps {
  name: string;
  size?: number;
}

const MemberAvatar = styled(Avatar)<MemberAvatarProps>(
  ({ theme, name, size }) => `
    margin-bottom: ${theme.spacing(1)};
    margin-right: auto;
    margin-left: auto;
    font-size: 2rem;
    background-color: ${stringToColor(name)};
    ${
      size
        ? `
      width: ${size}px;
    height: ${size}px;`
        : `
    width: ${theme.spacing(20)};
    height: ${theme.spacing(20)};
    ${theme.breakpoints.down("md")} {
      width: ${theme.spacing(15)};
      height: ${theme.spacing(15)};
    }

    ${theme.breakpoints.down("xs")} {
      width: ${theme.spacing(10)};
      height: ${theme.spacing(10)};
    }
    `
    }
`,
);

const firstLetterOfSentences = (s: string) => {
  return s
    .split(" ")
    .map((s) => s[0])
    .join("");
};

interface Props {
  firstName: string;
  lastName: string;
  pictureUrl: string;
  size?: number;
  party?: PartyAbbreviation;
}

const Picture: React.FC<Props> = ({
  firstName,
  lastName,
  pictureUrl,
  size,
  party,
}) => {
  const name = `${firstName} ${lastName}`;

  return (
    <Box position="relative">
      <MemberAvatar name={name} size={size}>
        <Image
          src={pictureUrl}
          alt={name}
          fill
          priority={true}
          style={{
            objectFit: "cover",
            fontSize: 0,
          }}
          sizes=" (max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
        />
        {firstLetterOfSentences(firstName)}
        {firstLetterOfSentences(lastName)}
      </MemberAvatar>
      {party && (
        <Box position="absolute" top={0} right={0}>
          <Image
            width={64}
            height={64}
            src={PARTY_LOGOS_LOW_RES[party.toUpperCase() as PartyAbbreviation]}
            alt="Partisymbol"
          />
        </Box>
      )}
    </Box>
  );
};

export default Picture;
