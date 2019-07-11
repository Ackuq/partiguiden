import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import LoadMoreButton from '../../../../components/LoadMoreButton';
import { useFilter } from '../../../../components/FilterContainer';
import { updateRoute } from '../../../../components/Filter';
import { apiLinks } from '../../../../utils';
import Ad from '../../../../components/Ad';
import Riksdagsbeslut from '../Decision';
import LoadCircle from '../../../../components/LoadCircle';
import fetchDecisionList from './fetchDecisionList';

const styles = () => ({
  listContainer: {
    marginBottom: '0.5rem',
    '& > div': {
      padding: '8px',
    },
  },
});

const useStyles = makeStyles(styles);

const DecisionList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [decision, setDecision] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(true);

  const { search, org } = useFilter()[0];

  const url = `${apiLinks.riksdagenApi}/dokumentlista/?sok=${search}&doktyp=bet&org=${org.join(
    '&org='
  )}&dokstat=beslutade&sort=${search ? 'rel' : 'datum'}&sortorder=desc&utformat=json&p=${page}`;

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    fetchDecisionList({ url, page }).then(res => {
      if (isMounted) {
        setLastPage(res.lastPage);
        if (res.beslut) setDecision(prevState => prevState.concat(...res.beslut));
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [page]);

  useEffect(() => {
    setDecision([]);
    updateRoute({ baseUrl: '/riksdagsbeslut', search, org });
    // eslint-disable-next-line no-new-wrappers
    setPage(new Number(1));
  }, [search, org]);

  return (
    <React.Fragment>
      <div className={classes.listContainer}>
        {decision.length > 0 &&
          decision.map((decisionObject, index) => (
            <React.Fragment key={decisionObject.dok_id}>
              {!(index % 15) && <Ad />}
              <div>
                <Riksdagsbeslut decision={decisionObject} />
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

export default DecisionList;
