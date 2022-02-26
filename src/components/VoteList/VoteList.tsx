import React, { useCallback } from 'react';
import { NextRouter } from 'next/router';
import { stringify } from 'querystring';

import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import { FlowAd } from '../Ad';
import Vote from './Vote';
import LoadCircle from '../LoadCircle';

import { useVotes } from '../../hooks/parliamentHooks';

const ListContainer = styled('div')`
  margin-bottom: 0.5rem;
  > div {
    padding: 8px;
  }
`;

interface Props {
  router: NextRouter;
  page: number;
}

const VoteList: React.FC<Props> = ({ router, page }) => {
  const data = useVotes(router.query);
  const updatePage = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      const query = { ...router.query, page: newPage };

      router.push(`${router.route}?${stringify(query)}`);
    },
    [router]
  );

  return (
    <ListContainer>
      {!data ? (
        <LoadCircle />
      ) : (
        <>
          {data.votes.length > 0 ? (
            <>
              {data.votes.map((vote, index) => (
                <React.Fragment key={`${vote.documentId}:${vote.proposition}`}>
                  {!(index % 15) && <FlowAd />}
                  <div>
                    <Vote vote={vote} />
                  </div>
                </React.Fragment>
              ))}
              {data.pages > 1 && (
                <Pagination
                  sx={{ display: 'flex', justifyContent: 'center' }}
                  onChange={updatePage}
                  page={page}
                  count={data.pages}
                />
              )}
            </>
          ) : (
            <Typography>Inga voteringar hittades</Typography>
          )}
        </>
      )}
    </ListContainer>
  );
};

export default VoteList;
