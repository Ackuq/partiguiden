import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { makeStyles } from '@material-ui/styles';
import {
  Collapse,
  Card,
  CardContent,
  CardHeader,
  Typography,
  ButtonBase,
  Button,
} from '@material-ui/core';
import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import PropTypes from 'prop-types';

import checkIfVotesExist from './checkIfVotesExist';
import getOrganInfo from '../../../../utils/authorityTable';
import styles from './styles';

const useStyles = makeStyles(styles);

const Decision = ({ decision }) => {
  const classes = useStyles();
  const [votesExist, setVotesExist] = useState(false);
  const [visible, setVisible] = useState(false);

  let mount = true;

  const organ = getOrganInfo(decision.organ);

  useEffect(() => {
    let url = decision.dokumentstatus_url_xml;
    url = url.replace('.xml', '.json');

    checkIfVotesExist({ url }).then(result => {
      if (mount) setVotesExist(result.votesExist);
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
                root: classes.headerRoot,
              }}
            />

            <CardContent classes={{ root: classes.cardContent }}>
              <div>
                <Typography variant="h3" align="left" gutterBottom classes={{ h3: classes.title }}>
                  {decision.notisrubrik}
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  align="left"
                  classes={{ h6: classes.subtitle }}
                >
                  {decision.titel}
                </Typography>
              </div>
              <ArrowDownRounded
                classes={{
                  root: `${classes.arrow} ${btnclass}`,
                }}
              />
            </CardContent>
          </ButtonBase>

          <CardContent>
            <Collapse className={classes.paragraphContainer} in={visible}>
              <div className="paragraph">
                {decision.notis && <div dangerouslySetInnerHTML={{ __html: decision.notis }} /> // eslint-disable-line react/no-danger
                }
              </div>
              <Button
                component="a"
                href={`/dokument/${decision.id}`}
                onClick={event => {
                  event.preventDefault();
                  Router.push(`/dokument/${decision.id}`);
                }}
              >
                Läs mer om betänkandet
              </Button>
              {votesExist && (
                <Button
                  component="a"
                  href="/voteringar"
                  onClick={event => {
                    event.preventDefault();
                    Router.push(`/voteringar?sok=${decision.rm}:${decision.beteckning}`);
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

Decision.propTypes = {
  decision: PropTypes.object.isRequired,
};

export default Decision;
