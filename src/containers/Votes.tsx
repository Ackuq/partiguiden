import React from 'react';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';

import Filter from '../components/ParlimentFilter';
import VoteList from '../components/VoteList';
import { queryAttrToArray, queryAttrToString, queryAttrToNumber } from '../utils';

const Votes: React.FC = () => {
  const router = useRouter();
  const search = queryAttrToString(router.query.sok);
  const page = queryAttrToNumber(router.query.page, 1);
  const org = queryAttrToArray(router.query.org);

  return (
    <div style={{ display: 'flex' }}>
      <Container maxWidth="md">
        <VoteList search={search} page={page} org={org} />
      </Container>
      <Filter router={router} search={search} org={org} />
    </div>
  );
};

export default Votes;
