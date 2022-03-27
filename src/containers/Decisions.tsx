import { queryAttrToArray, queryAttrToNumber, queryAttrToString } from '../utils';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import dynamic from 'next/dynamic';

const DecisionList = dynamic(() => import('../components/DecisionList/DecisionList'));
const Filter = dynamic(() => import('../components/ParlimentFilter/Filter'));

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
