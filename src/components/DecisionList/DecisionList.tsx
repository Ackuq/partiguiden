import React, { useCallback } from 'react';
import Pagination from '@material-ui/lab/Pagination';

import { NextRouter } from 'next/router';
import { stringify } from 'querystring';
import { Typography } from '@material-ui/core';
import { FlowAd } from '../Ad';
import Decision from './Decision';
import useStyles from './useStyles';
import LoadCircle from '../LoadCircle';
import { useDecisions } from '../../hooks/parlimentHooks';

interface Props {
  router: NextRouter;
  page: number;
}

const DecisionListContainer: React.FC<Props> = ({ router, page }) => {
  const classes = useStyles();
  const data = useDecisions(router.query);

  const updatePage = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      const { query } = router;
      query.page = `${newPage}`;

      router.push(`${router.route}?${stringify(query)}`);
    },
    [router]
  );

  return (
    <>
      <div className={classes.listContainer}>
        {!data ? (
          <LoadCircle />
        ) : (
          <>
            {data.decisions.length > 0 ? (
              <>
                {data.decisions.map((item, index) => (
                  <React.Fragment key={item.id + item.denomination}>
                    {!(index % 15) && <FlowAd />}
                    <div>
                      <Decision decision={item} classes={classes} />
                    </div>
                  </React.Fragment>
                ))}
                {data.pages > 1 && (
                  <Pagination
                    style={{ display: 'flex', justifyContent: 'center' }}
                    size="large"
                    onChange={updatePage}
                    page={page}
                    count={data.pages}
                  />
                )}
              </>
            ) : (
              <Typography>Inga riksdagsbeslut hittades</Typography>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DecisionListContainer;
