import Link from 'next/link';

import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

import { darken, styled } from '@mui/material/styles';

import VoteResult from './VoteResult';

import { lookupAuthority } from '../../utils';
import * as ROUTES from '../../lib/routes';

import { VoteListEntry } from '../../types/voting';

const CustomCardHeader = styled(CardHeader)<{ background: string }>`
  width: 100%;
  text-align: left;
  padding: 0.25rem 1rem;
  background-color: ${({ theme, background }) =>
    theme.palette.mode === 'dark' ? darken(background, 0.6) : background};
`;

const Title = styled(Typography)`
  font-size: 1.125rem;
  line-height: 1.3;
  color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.primary.dark};
`;

const Subtitle = styled(Typography)`
  font-size: 1rem;
  line-height: 1.25;
`;

interface Props {
  vote: VoteListEntry;
}

const Vote: React.FC<Props> = ({ vote }) => {
  const authority = lookupAuthority(vote.authority);

  return (
    <Card elevation={1} style={{ flex: 1 }}>
      <Link href={ROUTES.VOTE} as={ROUTES.getVoteHref(vote.documentId, vote.proposition)} passHref>
        <ButtonBase style={{ display: 'block' }} component="a">
          <CustomCardHeader title={authority.desc} background={authority.color} />
          <CardContent>
            <Title align="left" gutterBottom>
              {vote.title}
            </Title>
            <Subtitle align="left">{vote.subtitle}</Subtitle>
          </CardContent>

          <VoteResult votes={vote.results} />
        </ButtonBase>
      </Link>
    </Card>
  );
};

export default Vote;
