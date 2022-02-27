import { useRouter } from 'next/router';

import Container from '@mui/material/Container';

import Filter from '../components/ParlimentFilter/Filter';
import VoteList from '../components/VoteList/VoteList';

import { queryAttrToArray, queryAttrToNumber, queryAttrToString } from '../utils';

const Votes: React.FC = () => {
  const router = useRouter();
  const search = queryAttrToString(router.query.search);
  const page = queryAttrToNumber(router.query.page, 1);
  const org = queryAttrToArray(router.query.org);

  return (
    <div style={{ display: 'flex' }}>
      <Container maxWidth="md">
        <VoteList router={router} page={page} />
      </Container>
      <Filter router={router} search={search} org={org} />
    </div>
  );
};

export default Votes;
