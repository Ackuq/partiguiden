import Image from 'next/image';
import Link from 'next/link';

import { lookupAuthority } from '../../utils/authorityTable';

import * as ROUTES from '../../lib/routes';
import {
  CardButton,
  CardContainer,
  CustomCardContent,
  Subtitle,
  Title,
  TypeTitle,
} from '../DecisionList/Decision';
import { DebateListEntry, Participant } from '../../types/debate';
import { PARTY_LOGOS_LOW_RES } from '../../assets/logos';
import { PartyAbbreviation } from '../../utils/parties';
import { styled } from '@mui/material/styles';
import { useMember } from '../../hooks/parliamentHooks';
import AuthorityCardHeader from '../AuthorityCardHeader';

const ImageContainer = styled('div')<{ url: string }>`
  margin-left: 0.5rem;
  min-width: 90px;
  height: 90px;
  border-radius: 50%;
  background: url(${({ url }) => url});
  background-position-x: 50%;
  background-position-y: 25%;
  background-repeat: no-repeat;
  background-size: cover;
`;

interface SenderImageProps {
  sender: Participant;
}

const SenderImage: React.FC<SenderImageProps> = ({ sender }) => {
  const member = useMember(sender.id);

  if (!member) {
    return null;
  }

  return (
    <ImageContainer url={member.pictureUrl}>
      {member.party !== '-' && (
        <Image
          width={25}
          height={25}
          src={PARTY_LOGOS_LOW_RES[member.party.toUpperCase() as PartyAbbreviation]}
          alt="Partisymbol"
        />
      )}
    </ImageContainer>
  );
};

interface Props {
  debate: DebateListEntry;
}

const Debate: React.FC<Props> = ({ debate }) => {
  const authority = lookupAuthority(debate.authority);
  return (
    <CardContainer>
      <Link href={ROUTES.DEBATE} as={ROUTES.getDebateHref(debate.id)} passHref>
        <CardButton LinkComponent="a">
          {!!authority && <AuthorityCardHeader authority={authority} />}

          <CustomCardContent>
            <div>
              <TypeTitle color="textSecondary" align="left" gutterBottom>
                {debate.debateName}
              </TypeTitle>
              <Title align="left" gutterBottom>
                {debate.paragraphTitle}
              </Title>
              <Subtitle color="textSecondary" align="left">
                {!!debate.subtitle ? debate.subtitle : debate.title}
              </Subtitle>
            </div>

            {!!debate.participants?.sender && <SenderImage sender={debate.participants.sender} />}
          </CustomCardContent>
        </CardButton>
      </Link>
    </CardContainer>
  );
};

export default Debate;
