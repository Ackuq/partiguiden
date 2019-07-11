import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import LoadMoreButton from '../../../../components/LoadMoreButton';
import { apiLinks } from '../../../../utils';
import Ad from '../../../../components/Ad';
import Votering from '../Vote';
import LoadCircle from '../../../../components/LoadCircle';
import { updateRoute } from '../../../../components/Filter';
import { useFilter } from '../../../../components/FilterContainer';
import fetchVoteList from './fetchVoteList';

const styles = () => ({
  listContainer: {
    marginBottom: '0.5rem',
    '& > div': {
      padding: '8px',
    },
  },
});

const useStyles = makeStyles(styles);

const VoteList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const [votes, setVotes] = useState([]);
  const { search, org } = useFilter()[0];

  const url = `${apiLinks.riksdagenApi}/dokumentlista/?sok=${search}&doktyp=votering&org=${org.join(
    '&org='
  )}&sort=${search ? 'rel' : 'datum'}&sortorder=desc&utformat=json&a=s&p=${page}`;

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    fetchVoteList({ page, url }).then(res => {
      if (isMounted) {
        setLastPage(res.lastPage);
        if (res.voteringar) setVotes(prevState => prevState.concat(...res.voteringar));
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [page]);

  useEffect(() => {
    setVotes([]);
    updateRoute({ baseUrl: '/voteringar', search, org });
    // eslint-disable-next-line no-new-wrappers
    setPage(new Number(1));
  }, [search, org]);

  return (
    <React.Fragment>
      <div className={classes.listContainer}>
        {votes.length > 0 &&
          votes.map((votering, index) => (
            <React.Fragment key={votering.id + votering.beteckning}>
              {!(index % 15) && <Ad canBeLower={false} />}
              <div>
                <Votering votering={votering} />
              </div>
            </React.Fragment>
          ))}
      </div>
      {loading ? (
        <LoadCircle />
      ) : (
        !lastPage && (
          <LoadMoreButton
            onClick={() => {
              setLastPage(true);
              setPage(curr => curr + 1);
            }}
          />
        )
      )}
    </React.Fragment>
  );
};

export default VoteList;
