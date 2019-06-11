import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Ad from 'react-google-publisher-tag';

import Votering from '../Votering';
import LoadCircle from '../../../../LoadCircle';
import { useStateValue } from '../../../../../lib/stateProvider';
import { getVoteringList } from '../../lib';

import styles from './styles';

const Voteringar = ({ classes }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const [voteringar, setVoteringar] = useState([]);
  const { filter } = useStateValue()[0];

  const url = () => {
    const { search } = filter;
    const org = filter.org.join('&org=');
    return `https://data.riksdagen.se/dokumentlista/?sok=${search}&doktyp=votering&org=${org}&sort=${
      search ? 'rel' : 'datum'
    }&sortorder=desc&utformat=json&a=s&p=${page}`;
  };

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    getVoteringList({ page, url: url() }).then(res => {
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
  }, [filter]);

  return (
    <React.Fragment>
      <div className={classes.listContainer}>
        {voteringar &&
          voteringar.map((votering, index) => (
            <React.Fragment>
              {!(index % 15) && (
                <div className="responsive-ad">
                  <Ad canBeLower={false} path="/21821978280/responsive-ad" />
                </div>
              )}
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

export default withStyles(styles)(Voteringar);
