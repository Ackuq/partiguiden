import React, { useState } from 'react';
import Link from 'next/link';

import { Collapse, CardContent, Typography, ButtonBase, Button } from '@material-ui/core';
import { darken, useTheme } from '@material-ui/core/styles';

import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDownRounded';

import { lookupAuthority } from '../../utils/authorityTable';
import { Decision as DecisionType } from '../../types/decision';
import useStyles from './useStyles';

import * as ROUTES from '../../lib/routes';

interface Props {
  decision: DecisionType;
  classes: ReturnType<typeof useStyles>;
}

const Decision: React.FC<Props> = ({ decision, classes }) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const authority = lookupAuthority(decision.authority);

  const btnclass = visible ? classes.shown : '';
  return (
    <>
      {authority && (
        <div className={classes.cardContainer}>
          <ButtonBase className={classes.buttonContainer} onClick={() => setVisible(!visible)}>
            <div
              style={{
                background:
                  theme.palette.type === 'dark' ? darken(authority.color, 0.6) : authority.color,
              }}
              className={classes.headerRoot}
            >
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
              <ArrowDownIcon
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
                  <div dangerouslySetInnerHTML={{ __html: decision.paragraph }} />
                )}
              </div>
              <Link href={ROUTES.DOCUMENT} as={ROUTES.getDocumentHref(decision.id)} passHref>
                <Button component="a">Läs mer om betänkandet</Button>
              </Link>
              {decision.votesExists && (
                <Link href={`${ROUTES.VOTES}?search=${decision.voteSearchTerm}`} passHref>
                  <Button component="a">Läs mer om voteringarna</Button>
                </Link>
              )}
            </Collapse>
          </CardContent>
        </div>
      )}
    </>
  );
};

export default Decision;
