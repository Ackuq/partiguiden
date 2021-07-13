import React from 'react';
import { useRouter } from 'next/router';
import { Container } from '@material-ui/core';
import { css } from '@emotion/react';

import Filter from '../components/ParlimentFilter';
import VoteList from '../components/VoteList';

import { queryAttrToArray, queryAttrToString, queryAttrToNumber } from '../utils';

const Votes: React.FC = () => {
  const router = useRouter();
  const search = queryAttrToString(router.query.search);
  const page = queryAttrToNumber(router.query.page, 1);
  const org = queryAttrToArray(router.query.org);

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <Container maxWidth="md">
        <VoteList router={router} page={page} />
      </Container>
      <Filter router={router} search={search} org={org} />
    </div>
  );
};

export default Votes;
