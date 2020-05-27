import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { votingResult } from '../../types/voting.d';
import useStyles from './useStyles';

interface Props {
  votes: votingResult;
  classes: ReturnType<typeof useStyles>;
}

const VoteResult: React.FC<Props> = ({ votes, classes }) => {
  const bgYes = votes.total ? { backgroundColor: '#c8e6c9' } : { backgroundColor: '#e0e0e0' };
  const bgNo = votes.total ? { backgroundColor: '#e0e0e0' } : { backgroundColor: '#ffcdd2' };

  return (
    <Grid container className={classes.vote}>
      <Grid item sm={6} xs={12}>
        <div className="box" style={bgYes}>
          <Typography align="center" variant="h5" gutterBottom>
            JA
          </Typography>
          <div className={classes.parties}>
            {votes.ja.map((party: string) => (
              <Typography variant="h6" color="textSecondary" key={party}>
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
            {votes.nej.map((party: string) => (
              <Typography variant="h6" color="textSecondary" key={party}>
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

export default VoteResult;
