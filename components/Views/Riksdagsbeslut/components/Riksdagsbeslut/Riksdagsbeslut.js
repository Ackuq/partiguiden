/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

/* Material UI */
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

/* HTML parser */
import parse from 'html-react-parser';

/* Axios */
import axios from 'axios';
import { Link, Router } from '../../../../../lib/routes';

import getOrganInfo from '../../../../../lib/authorityTable';
import { checkVote } from '../../lib';

import styles from './styles';

import { useStateValue } from '../../../../../lib/stateProvider';

const Riksdagsbeslut = ({ beslut, classes }) => {
  const [voteringarExist, setVoteringarExist] = useState(false);
  const [visible, setVisible] = useState(false);
  const [organ, setOrgan] = useState(null);
  const dispatch = useStateValue()[1];

  useEffect(() => {
    let { dokumentstatus_url_xml } = beslut;
    dokumentstatus_url_xml = dokumentstatus_url_xml.replace('.xml', '.json');
    axios({ method: 'get', url: `https:${dokumentstatus_url_xml}` }).then(response => {
      if (typeof response.data === 'string') return;
      const { dokumentstatus } = response.data;

      setOrgan(getOrganInfo(dokumentstatus.dokument.organ));

      if (dokumentstatus.dokutskottsforslag) {
        setVoteringarExist(checkVote(dokumentstatus.dokutskottsforslag.utskottsforslag));
      }
    });
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
                    dispatch({ type: 'SET_ORG', org: organ.code });
                    dispatch({ type: 'SET_NUM', num: beslut.nummer });
                    dispatch({ type: 'SET_BET', bet: beslut.beteckning });
                    dispatch({ type: 'SET_RM', rm: beslut.rm });
                    Router.pushRoute('/voteringar');
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
