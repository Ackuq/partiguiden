import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';

import { FlowAd } from '../Ad';
import Decision from './Decision';
import useStyles from './useStyles';
import { Decision as DecisionType } from '../../types/decision.d';
import { getDecisionList } from '../../lib/parlimentApi';
import LoadCircle from '../LoadCircle';

interface Props {
  search: string;
  org: Array<string>;
  page: number;
}

const DecisionList: React.FC<Props> = ({ search, org, page }) => {
  const classes = useStyles();

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
            <Pagination page={page} count={pages} />
          </>
        )}
      </div>
    </>
  );
};

export default DecisionList;
