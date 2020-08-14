import React, { useState, useEffect, useCallback } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { NextRouter } from 'next/router';

import { FlowAd } from '../Ad';
import Vote from './Vote';
import useStyles from './useStyles';
import { VoteListEntry } from '../../types/voting.d';
import { getVoteList } from '../../lib/parlimentApi';
import LoadCircle from '../LoadCircle';

interface Props {
  router: NextRouter;
  search: string;
  org: Array<string>;
  page: number;
}

const VoteList: React.FC<Props> = ({ router, search, org, page }) => {
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
  const [votes, setVotes] = useState<Array<VoteListEntry>>([]);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    getVoteList(search, org, page).then((res) => {
      setVotes(res.votes);
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
            {votes.map((item, index) => (
              <React.Fragment key={item.id + item.beteckning}>
                {!(index % 15) && <FlowAd />}
                <div>
                  <Vote votering={item} classes={classes} />
                </div>
              </React.Fragment>
            ))}
            <Pagination
              style={{ display: 'flex', justifyContent: 'center' }}
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

export default VoteList;
