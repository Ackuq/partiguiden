import React, { useState } from 'react';
import { Typography, Collapse, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';

import { array } from 'prop-types';
import { Link } from '../../../../lib/routes';
import styles from '../../styles';

const useStyles = makeStyles(styles);

const BehandladeDokument = ({ behandladeDokument }) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  return (
    <div className={classes.contentContainer}>
      <ButtonBase onClick={() => setVisible(!visible)} classes={{ root: classes.button }}>
        <Typography variant="h5" color="inherit">
          Behandlade dokument
        </Typography>
        <ArrowDownRounded
          classes={{
            root: `${classes.arrow} ${visible ? classes.arrowVisible : ''}`
          }}
        />
      </ButtonBase>
      <Collapse in={visible}>
        <div style={{ marginTop: '1.25rem' }}>
          {behandladeDokument.map((dokument, index) => (
            <React.Fragment key={dokument[3]}>
              <Link route="dokument" params={{ id: dokument[3] }}>
                <a style={{ textDecoration: 'none' }}>
                  <Typography variant="body1" color="primary">
                    [{index}] {dokument[0]}
                  </Typography>
                </a>
              </Link>
              <br />
            </React.Fragment>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

BehandladeDokument.propTypes = {
  behandladeDokument: array.isRequired
};

export default BehandladeDokument;
