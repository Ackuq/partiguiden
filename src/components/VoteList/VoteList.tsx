import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';

import { FlowAd } from '../Ad';
import Vote from './Vote';
import useStyles from './useStyles';
import { VoteListEntry } from '../../types/voting.d';
import { getVoteList } from '../../lib/parlimentApi';
import LoadCircle from '../LoadCircle';

interface Props {
  search: string;
  org: Array<string>;
  page: number;
}

const VoteList: React.FC<Props> = ({ search, org, page }) => {
  const classes = useStyles();

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
            <Pagination page={page} count={pages} />
          </>
        )}
      </div>
    </>
  );
};

export default VoteList;
