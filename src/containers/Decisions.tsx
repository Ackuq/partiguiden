import Container from '@mui/material/Container';

import { useRouter } from 'next/router';

import DecisionList from '../components/DecisionList/DecisionList';
import Filter from '../components/ParlimentFilter/Filter';

import { queryAttrToArray, queryAttrToNumber, queryAttrToString } from '../utils';

const Decisions: React.FC = () => {
  const router = useRouter();
  const search = queryAttrToString(router.query.search);
  const page = queryAttrToNumber(router.query.page, 1);
  const org = queryAttrToArray(router.query.org);

  return (
    <div style={{ display: 'flex' }}>
      <Container maxWidth="md">
        <DecisionList router={router} page={page} />
      </Container>
      <Filter router={router} search={search} org={org} />
    </div>
  );
};

export default Decisions;
