import React from 'react';
import { Container } from '@material-ui/core';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';

import Filter from '../components/ParlimentFilter';
import DecisionList from '../components/DecisionList';

import { queryAttrToArray, queryAttrToString, queryAttrToNumber } from '../utils';

const Decisions: React.FC = () => {
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
        <DecisionList router={router} page={page} />
      </Container>
      <Filter router={router} search={search} org={org} />
    </div>
  );
};

export default Decisions;
