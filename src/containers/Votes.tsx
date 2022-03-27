import { useRouter } from 'next/router';

import Container from '@mui/material/Container';

import { queryAttrToArray, queryAttrToNumber, queryAttrToString } from '../utils';
import dynamic from 'next/dynamic';

const Filter = dynamic(() => import('../components/ParlimentFilter/Filter'));
const VoteList = dynamic(() => import('../components/VoteList/VoteList'));

const Votes: React.FC = () => {
  const router = useRouter();
  const search = queryAttrToString(router.query.search);
  const page = queryAttrToNumber(router.query.page, 1);
  const org = queryAttrToArray(router.query.org);

  return (
    <div style={{ display: 'flex' }}>
      <Container
        maxWidth="md"
        sx={{
          marginBottom: 1,
          minHeight: '50vh',
          '&> div': {
            padding: 1,
          },
        }}
      >
        <VoteList router={router} page={page} />
      </Container>
      <Filter router={router} search={search} org={org} />
    </div>
  );
};

export default Votes;
