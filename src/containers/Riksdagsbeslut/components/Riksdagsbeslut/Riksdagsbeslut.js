import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { makeStyles } from '@material-ui/styles';
import {
  Collapse,
  Card,
  CardContent,
  CardHeader,
  Typography,
  ButtonBase,
  Button
} from '@material-ui/core';
import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import PropTypes from 'prop-types';

import { checkIfVotesExist } from '../../lib';
import getOrganInfo from '../../../../utils/authorityTable';
import styles from './styles';
import { useStateValue } from '../../../../lib/stateProvider';

const useStyles = makeStyles(styles);

const Riksdagsbeslut = ({ beslut }) => {
  const classes = useStyles();
  const [voteringarExist, setVoteringarExist] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useStateValue()[1];

  let mount = true;

  const organ = getOrganInfo(beslut.organ);

  useEffect(() => {
    let url = beslut.dokumentstatus_url_xml;
    url = url.replace('.xml', '.json');

    checkIfVotesExist({ url }).then(result => {
      if (mount) setVoteringarExist(result.voteringarExist);
    });
    return () => {
      mount = false;
    };
  }, []);

  const btnclass = visible ? classes.shown : '';
  return (
    <React.Fragment>
      {organ && (
        <Card>
          <ButtonBase className={classes.buttonContainer} onClick={() => setVisible(!visible)}>
            <CardHeader
              title={organ.desc}
              style={{ background: organ.color }}
              classes={{
                title: classes.headerTitle,
                root: classes.headerRoot
              }}
            />

            <CardContent classes={{ root: classes.cardContent }}>
              <div>
                <Typography variant="h3" align="left" gutterBottom classes={{ h3: classes.title }}>
                  {beslut.notisrubrik}
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  align="left"
                  classes={{ h6: classes.subtitle }}
                >
                  {beslut.titel}
                </Typography>
              </div>
              <ArrowDownRounded
                classes={{
                  root: `${classes.arrow} ${btnclass}`
                }}
              />
            </CardContent>
          </ButtonBase>

          <CardContent>
            <Collapse className={classes.paragraphContainer} in={visible}>
              <div className="paragraph">
                {beslut.notis && <div dangerouslySetInnerHTML={{ __html: beslut.notis }} /> // eslint-disable-line react/no-danger
                }
              </div>
              <Button>
                <Link href={`/dokument?id=${beslut.id}`} as={`/dokument/${beslut.id}`}>
                  <Typography component="a" variant="button">
                    Läs mer om betänkandet
                  </Typography>
                </Link>
              </Button>
              {voteringarExist && (
                <Button
                  component="div"
                  onClick={() => {
                    Router.push('/voteringar');
                    dispatch({ type: 'RESET_FILTER' });
                    dispatch({
                      type: 'SET_SEARCH',
                      searchInput: `${beslut.rm}:${beslut.beteckning}`
                    });
                  }}
                >
                  Läs mer om voteringarna
                </Button>
              )}
            </Collapse>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
};

Riksdagsbeslut.propTypes = {
  beslut: PropTypes.object.isRequired
};

export default Riksdagsbeslut;
