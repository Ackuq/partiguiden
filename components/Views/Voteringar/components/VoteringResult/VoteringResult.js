import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const voteringResult = () => ({
  votering: {
    display: 'flex',
    '& .box': {
      padding: '0.25rem'
    }
  },
  parties: {
    display: 'flex',
    justifyContent: 'center',
    '& h6': {
      padding: '0.25rem'
    },
    '& img': {
      height: '30px'
    }
  }
});

export default withStyles(voteringResult)(({ votes, classes }) => {
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
                <img src={`/static/images/party-logos/${party}.svg`} alt="party logo" />
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
                <img src={`/static/images/party-logos/${party}.svg`} alt="party logo" />
              </Typography>
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
});
