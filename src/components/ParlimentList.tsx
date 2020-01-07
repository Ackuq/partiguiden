import React, { useState, useEffect, useRef } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';

import LoadMoreButton from './LoadMoreButton';
import LoadCircle from './LoadCircle';
import { updateRoute } from './ParlimentFilter';
import { useFilter } from './Filter';

const styles = () => ({
  listContainer: {
    marginBottom: '0.5rem',
    '& > div': {
      padding: '8px',
    },
  },
});

const useStyles = makeStyles(styles);

interface Props {
  extractData: Function;
  fetchList: Function;
  baseUrl: string;
  Item: React.ElementType;
  url: Function;
}

const ParlimentList: React.FC<Props> = ({ fetchList, extractData, baseUrl, Item, url }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const [list, setList] = useState([]);
  const {
    state: { search, org },
  } = useFilter();

  const didMount = useRef(false);

  const updateList = () => {
    setLoading(true);
    fetchList({ page, url: url({ search, org, page }) }).then(res => {
      setLastPage(res.lastPage);
      if (extractData(res)) setList(prevState => prevState.concat(...extractData(res)));
      setLoading(false);
    });
  };

  useEffect(() => {
    if (didMount.current) {
      updateList();
    } else {
      didMount.current = true;
    }
  }, [page]);

  useEffect(() => {
    setList([]);
    updateRoute({ baseUrl, search, org });
    if (page === 1) {
      updateList();
    } else {
      setPage(1);
    }
  }, [search, org]);

  return (
    <>
      <div className={classes.listContainer}>
        {list.length > 0 && list.map((item, index) => <Item index={index} item={item} />)}
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
    </>
  );
};

export default ParlimentList;
