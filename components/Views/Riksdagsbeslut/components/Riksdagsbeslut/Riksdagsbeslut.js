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
import { Link } from '../../../../../lib/routes';

import getOrganInfo from '../../../../../lib/authorityTable';
import { checkVote } from '../../lib';

import styles from './styles';

const Riksdagsbeslut = ({ beslut, classes }) => {
  const [voteringarExist, setVoteringarExist] = useState(false);
  const [visible, setVisible] = useState(false);
  const [organ, setOrgan] = useState(null);

  useEffect(() => {
    let { dokumentstatus_url_xml } = beslut;
    dokumentstatus_url_xml = dokumentstatus_url_xml.replace('.xml', '.json');
    axios({ method: 'get', url: `https:${dokumentstatus_url_xml}` }).then(response => {
      if (typeof response.data === 'string') return;
      const { dokumentstatus } = response.data;
      const { utskottsforslag } = dokumentstatus.dokutskottsforslag;

      setOrgan(getOrganInfo(dokumentstatus.dokument.organ));
      setVoteringarExist(checkVote(utskottsforslag));
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
                <Button component="div">
                  <Link
                    route="voteringar"
                    params={{
                      rm: beslut.rm,
                      bet: beslut.beteckning,
                      num: beslut.nummer,
                      org: `${organ.code}`
                    }}
                  >
                    <a>Läs mer om voteringarna</a>
                  </Link>
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
