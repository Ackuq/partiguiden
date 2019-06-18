import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
import { object } from 'prop-types';

import styles from './styles';

const useStyles = makeStyles(styles);

const VoteringResult = ({ votes }) => {
  const classes = useStyles();
  const bgYes = votes.total ? { backgroundColor: '#c8e6c9' } : { backgroundColor: '#e0e0e0' };
  const bgNo = votes.total ? { backgroundColor: '#e0e0e0' } : { backgroundColor: '#ffcdd2' };

  return (
    <Grid container className={`${classes.votering}`}>
      <Grid item sm={6} xs={12}>
        <div className="box" style={bgYes}>
          <Typography align="center" variant="h5" gutterBottom>
            JA
          </Typography>
          <div className={classes.parties}>
            {votes.ja.map(party => (
              <Typography variant="h6" color="textSecondary" key={`${party}`}>
                <img
                  src={`/static/images/party-logos/${party.toUpperCase()}.svg`}
                  alt="party logo"
                />
              </Typography>
            ))}
          </div>
        </div>
      </Grid>

      <Grid item sm={6} xs={12}>
        <div className="box" style={bgNo}>
          <Typography align="center" variant="h5" gutterBottom>
            NEJ
          </Typography>
          <div className={classes.parties}>
            {votes.nej.map(party => (
              <Typography variant="h6" color="textSecondary" key={`${party}`}>
                <img
                  src={`/static/images/party-logos/${party.toUpperCase()}.svg`}
                  alt="party logo"
                />
              </Typography>
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

VoteringResult.propTypes = {
  votes: object.isRequired
};

export default VoteringResult;
