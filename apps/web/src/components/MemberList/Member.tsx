import Image from "next/image";
import Link from "next/link";

import { styled } from "@mui/material/styles";

import * as ROUTES from "../../lib/routes";
import { PARTY_LOGOS_LOW_RES } from "../../assets/logos";
import type { PartyAbbreviation } from "../../utils/parties";

import type { MemberListEntry } from "../../types/member";

const MemberCard = styled("a")(
  ({ theme }) => `
  box-shadow: ${theme.shadows[1]};
  border-radius: ${theme.shape.borderRadius}px;
  background-color: ${theme.palette.background.paper};
  position: relative;
  display: flex;
  padding: 0.5rem 1rem 1.5rem 0.5rem;
  justify-content: space-between;
  text-align: left;
  flex: 1;
  text-decoration: none;
`,
);

const InfoContainer = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark"
      ? theme.palette.text.primary
      : theme.palette.primary.main
  };
  display: flex;
  flex-direction: column;
`,
);

const InfoTitle = styled("span")`
  font-weight: 500;
  margin-top: 0.25rem;
  margin-bottom: 0.125rem;
`;

const ImageContainer = styled("div")<{ url: string }>`
  width: 175px;
  height: 175px;
  border-radius: 50%;
  background: url(${({ url }) => url});
  background-position-x: 50%;
  background-position-y: 25%;
  background-repeat: no-repeat;
  background-size: cover;
`;

const NameContainer = styled("div")`
  padding: 0.5rem;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  border-radius: 0 0 4px 4px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
`;

interface Props {
  member: MemberListEntry;
}

const Member: React.FC<Props> = ({ member }) => (
  <Link
    href={ROUTES.MEMBER}
    as={ROUTES.getMemberHref(member.id)}
    passHref
    legacyBehavior
  >
    <MemberCard>
      <InfoContainer>
        <InfoTitle>Valkrets</InfoTitle>
        <span>{member.district}</span>

        <InfoTitle>Ålder</InfoTitle>
        <span>{member.age}</span>
      </InfoContainer>
      <ImageContainer url={member.pictureUrl}>
        {member.party !== "-" && (
          <Image
            width={50}
            height={50}
            src={
              PARTY_LOGOS_LOW_RES[
                member.party.toUpperCase() as PartyAbbreviation
              ]
            }
            alt="Partisymbol"
          />
        )}
      </ImageContainer>

      <NameContainer>
        <span>
          {member.lastName}, {member.firstName}
        </span>
      </NameContainer>
    </MemberCard>
  </Link>
);

export default Member;
