import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import parse from 'html-react-parser';

import { checkIfVotesExist } from '../../lib';
import { Link, Router } from '../../../../../lib/routes';
import getOrganInfo from '../../../../../lib/authorityTable';
import styles from './styles';
import { useStateValue } from '../../../../../lib/stateProvider';

const Riksdagsbeslut = ({ beslut, classes }) => {
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
              <div className="paragraph">{beslut.notis && parse(beslut.notis)}</div>
              <Button component="div">
                <Link route="dokument" params={{ id: beslut.id }}>
                  <a>Läs mer om betänkandet</a>
                </Link>
              </Button>
              {voteringarExist && (
                <Button
                  component="div"
                  onClick={() => {
                    Router.pushRoute('/voteringar');
                    window.scrollTo(0, 0);
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

export default withStyles(styles)(Riksdagsbeslut);
