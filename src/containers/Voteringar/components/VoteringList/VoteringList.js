import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

import { apiLinks } from '../../../../utils';
import Ad from '../../../../components/Ad';
import Votering from '../Votering';
import LoadCircle from '../../../../components/LoadCircle';
import { useFilter } from '../../../../components/FilterContainer';
import { getVoteringList } from '../../lib';

import styles from './styles';

const useStyles = makeStyles(styles);

const Voteringar = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const [voteringar, setVoteringar] = useState([]);
  const { search, org } = useFilter()[0];

  const url = `${apiLinks.riksdagenApi}/dokumentlista/?sok=${search}&doktyp=votering&org=${org.join(
    '&org='
  )}&sort=${search ? 'rel' : 'datum'}&sortorder=desc&utformat=json&a=s&p=${page}`;

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    getVoteringList({ page, url }).then(res => {
      if (isMounted) {
        setLastPage(res.lastPage);
        if (res.voteringar) setVoteringar(voteringar.concat(...res.voteringar));
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [page]);

  useEffect(() => {
    setVoteringar([]);
    // eslint-disable-next-line no-new-wrappers
    setPage(new Number(1));
  }, [search, org]);

  return (
    <React.Fragment>
      <div className={classes.listContainer}>
        {voteringar &&
          voteringar.map((votering, index) => (
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
          <React.Fragment>
            <div className={classes.buttonContainer}>
              <ButtonBase
                className={classes.loadMore}
                onClick={() => {
                  setLastPage(true);
                  setPage(curr => curr + 1);
                }}
              >
                Ladda mer
              </ButtonBase>
            </div>
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
};

export default Voteringar;
