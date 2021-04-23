import React from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { votingResult } from '../../types/voting';
import useStyles from './useStyles';

const yesColor = '#c8e6c9';
const noColor = '#ffcdd2';
const losingColor = '#e0e0e0';

interface Props {
  votes: votingResult;
  classes: ReturnType<typeof useStyles>;
}

const VoteResult: React.FC<Props> = ({ votes, classes }) => (
  <Grid container className={classes.vote}>
    {votes.no.length || votes.yes.length ? (
      <>
        <Grid item sm={6} xs={12}>
          <div
            className="box"
            style={{
              backgroundColor: votes.winner === 'yes' ? yesColor : losingColor,
            }}
          >
            <Typography align="center" variant="h5" gutterBottom>
              JA
            </Typography>
            <div className={classes.parties}>
              {votes.yes.map((party: string) => (
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
          <div
            className="box"
            style={{
              backgroundColor: votes.winner === 'no' ? noColor : losingColor,
            }}
          >
            <Typography align="center" variant="h5" gutterBottom>
              NEJ
            </Typography>
            <div className={classes.parties}>
              {votes.no.map((party: string) => (
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
      </>
    ) : (
      <Grid xs={12}>
        <div style={{ backgroundColor: losingColor }}>
          <Typography className="box" align="center" variant="h6">
            Ingen voteringsdata hittades
          </Typography>
        </div>
      </Grid>
    )}
  </Grid>
);

export default VoteResult;
