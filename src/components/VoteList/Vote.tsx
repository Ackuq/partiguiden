import Link from 'next/link';

import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import VoteResult from './VoteResult';

import * as ROUTES from '../../lib/routes';
import { lookupAuthority } from '../../utils';

import { VoteListEntry } from '../../types/voting';
import AuthorityCardHeader from '../AuthorityCardHeader';

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
          <AuthorityCardHeader authority={authority} />

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
