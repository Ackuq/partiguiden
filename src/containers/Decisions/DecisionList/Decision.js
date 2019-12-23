import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { Collapse, CardContent, Typography, ButtonBase, Button } from '@material-ui/core';
import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import PropTypes from 'prop-types';

import checkIfVotesExist from './checkIfVotesExist';
import getOrganInfo from '../../../utils/authorityTable';

const Decision = ({ decision, classes }) => {
  const [votesExist, setVotesExist] = useState(false);
  const [visible, setVisible] = useState(false);

  const organ = getOrganInfo(decision.organ);

  useEffect(() => {
    let mount = true;
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
    <>
      {organ && (
        <div className={classes.cardContainer}>
          <ButtonBase className={classes.buttonContainer} onClick={() => setVisible(!visible)}>
            <div style={{ background: organ.color }} className={classes.headerRoot}>
              <span className={classes.headerTitle}>{organ.desc}</span>
            </div>

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
                  Router.push('/dokument/[id]', `/dokument/${decision.id}`);
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
        </div>
      )}
    </>
  );
};

Decision.propTypes = {
  decision: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Decision;
