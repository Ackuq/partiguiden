import React, { useState } from 'react';
import Link from 'next/link';
import { Typography, Collapse, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';

import { array } from 'prop-types';
import styles from '../../styles';

const useStyles = makeStyles(styles);

const ProcessedDocuments = ({ processedDocuments }) => {
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
            root: `${classes.arrow} ${visible ? classes.arrowVisible : ''}`,
          }}
        />
      </ButtonBase>
      <Collapse in={visible}>
        <div style={{ marginTop: '1.25rem' }}>
          {processedDocuments.map((document, index) => (
            <React.Fragment key={document[3]}>
              <Link href={`/dokument?id=${document[3]}`} as={`/dokument/${document[3]}`}>
                <Typography
                  component="a"
                  variant="body1"
                  color="primary"
                  href={`/dokument/${document[3]}`}
                >
                  [{index}] {document[0]}
                </Typography>
              </Link>
              <br />
            </React.Fragment>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

ProcessedDocuments.propTypes = {
  processedDocuments: array.isRequired,
};

export default ProcessedDocuments;
