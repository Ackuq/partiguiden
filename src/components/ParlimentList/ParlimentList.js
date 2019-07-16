import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { func, string } from 'prop-types';

import LoadMoreButton from '../LoadMoreButton';
import LoadCircle from '../LoadCircle';
import { updateRoute } from '../ParlimentFilter';
import { useFilter } from '../Filter';

const styles = () => ({
  listContainer: {
    marginBottom: '0.5rem',
    '& > div': {
      padding: '8px',
    },
  },
});

const useStyles = makeStyles(styles);

const ParlimentList = ({ fetchList, extractData, baseUrl, renderItem, url }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const [list, setList] = useState([]);
  const { search, org } = useFilter()[0];

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    fetchList({ page, url: url({ search, org, page }) }).then(res => {
      if (isMounted) {
        setLastPage(res.lastPage);
        if (extractData(res)) setList(prevState => prevState.concat(...extractData(res)));
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [page]);

  useEffect(() => {
    setList([]);
    updateRoute({ baseUrl, search, org });
    // eslint-disable-next-line no-new-wrappers
    setPage(new Number(1));
  }, [search, org]);

  return (
    <React.Fragment>
      <div className={classes.listContainer}>
        {list.length > 0 && list.map((item, index) => renderItem({ item, index }))}
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

ParlimentList.propTypes = {
  extractData: func.isRequired,
  fetchList: func.isRequired,
  baseUrl: string.isRequired,
  renderItem: func.isRequired,
  url: func.isRequired,
};

export default ParlimentList;
