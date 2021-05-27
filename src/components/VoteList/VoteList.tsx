import React, { useCallback } from 'react';
import { NextRouter } from 'next/router';
import { stringify } from 'querystring';

import { Pagination } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

import { FlowAd } from '../Ad';
import Vote from './Vote';
import LoadCircle from '../LoadCircle';

import useStyles from './useStyles';
import { useVotes } from '../../hooks/parliamentHooks';

interface Props {
  router: NextRouter;
  page: number;
}

const VoteList: React.FC<Props> = ({ router, page }) => {
  const classes = useStyles();
  const data = useVotes(router.query);
  const updatePage = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      const query = { ...router.query, page: newPage };

      router.push(`${router.route}?${stringify(query)}`);
    },
    [router]
  );

  return (
    <div className={classes.listContainer}>
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
                    <Vote vote={vote} classes={classes} />
                  </div>
                </React.Fragment>
              ))}
              {data.pages > 1 && (
                <Pagination
                  style={{ display: 'flex', justifyContent: 'center' }}
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
    </div>
  );
};

export default VoteList;
