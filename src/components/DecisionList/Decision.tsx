import React, { useState } from 'react';
import Router from 'next/router';

import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';

import { lookupAuthority } from '../../utils/authorityTable';
import { Decision as DecisionType } from '../../types/decision';
import useStyles from './useStyles';

interface Props {
  decision: DecisionType;
  classes: ReturnType<typeof useStyles>;
}

const Decision: React.FC<Props> = ({ decision, classes }) => {
  const [visible, setVisible] = useState(false);

  const authority = lookupAuthority(decision.authority);

  const btnclass = visible ? classes.shown : '';
  return (
    <>
      {authority && (
        <div className={classes.cardContainer}>
          <ButtonBase className={classes.buttonContainer} onClick={() => setVisible(!visible)}>
            <div style={{ background: authority.color }} className={classes.headerRoot}>
              <span className={classes.headerTitle}>{authority.desc}</span>
            </div>

            <CardContent classes={{ root: classes.cardContent }}>
              <div>
                <Typography variant="h3" align="left" gutterBottom classes={{ h3: classes.title }}>
                  {decision.paragraphTitle}
                </Typography>
                <Typography
                  variant="h6"
                  color="textSecondary"
                  align="left"
                  classes={{ h6: classes.subtitle }}
                >
                  {decision.title}
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
                {decision.paragraph && (
                  <div dangerouslySetInnerHTML={{ __html: decision.paragraph }} /> // eslint-disable-line react/no-danger
                )}
              </div>
              <Button
                component="a"
                href={`/dokument/${decision.id}`}
                onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                  event.preventDefault();
                  Router.push('/dokument/[id]', `/dokument/${decision.id}`);
                }}
              >
                Läs mer om betänkandet
              </Button>
              {decision.votesExists && (
                <Button
                  component="a"
                  href="/voteringar"
                  onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                    event.preventDefault();
                    Router.push(`/voteringar?search=${decision.voteSearchTerm}`);
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

export default Decision;
