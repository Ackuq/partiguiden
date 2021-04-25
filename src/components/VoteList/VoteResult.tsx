import React, { useMemo } from 'react';

import Image from 'next/image';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core';

import { VotingResult } from '../../types/voting';
import useStyles from './useStyles';
import { voteListColors } from '../../lib/voteColors';

interface Props {
  votes: VotingResult;
  classes: ReturnType<typeof useStyles>;
}

const VoteResult: React.FC<Props> = ({ votes, classes }) => {
  const theme = useTheme();

  const colors = useMemo(() => voteListColors[theme.palette.type], [theme.palette.type]);

  return (
    <Grid container className={classes.vote}>
      {votes.no.length || votes.yes.length ? (
        <>
          <Grid item sm={6} xs={12}>
            <div
              className="box"
              style={{
                backgroundColor: votes.winner === 'yes' ? colors.yes : colors.losing,
              }}
            >
              <Typography align="center" variant="h5" gutterBottom>
                JA
              </Typography>
              <div className={classes.parties}>
                {votes.yes.map((party: string) => (
                  <div key={party}>
                    <Image
                      src={`/static/images/party-logos/${party.toUpperCase()}.png`}
                      layout="intrinsic"
                      width="40%"
                      height="40%"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Grid>

          <Grid item sm={6} xs={12}>
            <div
              className="box"
              style={{
                backgroundColor: votes.winner === 'no' ? colors.no : colors.losing,
              }}
            >
              <Typography align="center" variant="h5" gutterBottom>
                NEJ
              </Typography>
              <div className={classes.parties}>
                {votes.no.map((party: string) => (
                  <div key={party}>
                    <Image
                      src={`/static/images/party-logos/${party.toUpperCase()}.png`}
                      layout="intrinsic"
                      width="40%"
                      height="40%"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          <div style={{ backgroundColor: colors.losing }}>
            <Typography className="box" align="center" variant="h6">
              Ingen voteringsdata hittades
            </Typography>
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default VoteResult;
