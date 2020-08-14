import React, { useState, useEffect, useCallback } from 'react';
import Pagination from '@material-ui/lab/Pagination';

import { NextRouter } from 'next/router';
import { FlowAd } from '../Ad';
import Decision from './Decision';
import useStyles from './useStyles';
import { Decision as DecisionType } from '../../types/decision.d';
import { getDecisionList } from '../../lib/parlimentApi';
import LoadCircle from '../LoadCircle';

interface Props {
  router: NextRouter;
  search: string;
  org: Array<string>;
  page: number;
}

const DecisionList: React.FC<Props> = ({ router, search, org, page }) => {
  const classes = useStyles();

  const updatePage = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      const query = [];
      if (search) {
        query.push(`sok=${search}`);
      }
      if (org.length) {
        query.push(`org=${org.join('&org=')}`);
      }
      query.push(`page=${newPage}`);

      const queryString = query.length ? `?${query.join('&')}` : '';

      router.push(`${router.route}${queryString}`);
    },
    [router]
  );

  const [loading, setLoading] = useState(true);
  const [decisions, setDecisions] = useState<Array<DecisionType>>([]);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    getDecisionList(search, org, page).then((res) => {
      setDecisions(res.decisions);
      setPages(res.pages);
      setLoading(false);
    });
  }, [page, search, org]);

  return (
    <>
      <div className={classes.listContainer}>
        {loading ? (
          <LoadCircle />
        ) : (
          <>
            {decisions.map((item, index) => (
              <React.Fragment key={item.id + item.beteckning}>
                {!(index % 15) && <FlowAd />}
                <div>
                  <Decision decision={item} classes={classes} />
                </div>
              </React.Fragment>
            ))}
            <Pagination
              style={{ display: 'flex', justifyContent: 'center' }}
              size="large"
              onChange={updatePage}
              page={page}
              count={pages}
            />
          </>
        )}
      </div>
    </>
  );
};

export default DecisionList;
