import Container from '@mui/material/Container';
import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import { queryAttrToArray, queryAttrToNumber, queryAttrToString } from '../utils';

const DebateListContainer = dynamic(() => import('../components/DebateList/DebateList'));
const Filter = dynamic(() => import('../components/ParlimentFilter/Filter'));

const Debates: React.FC = () => {
  const router = useRouter();
  const search = queryAttrToString(router.query.search);
  const page = queryAttrToNumber(router.query.page, 1);
  const org = queryAttrToArray(router.query.org);

  return (
    <div style={{ display: 'flex' }}>
      <Container
        maxWidth="md"
        sx={{ marginBottom: 1, minHeight: '50vh', '&> div': { padding: 1 } }}
      >
        <DebateListContainer router={router} page={page} />
      </Container>
      <Filter router={router} search={search} org={org} />
    </div>
  );
};

export default Debates;
