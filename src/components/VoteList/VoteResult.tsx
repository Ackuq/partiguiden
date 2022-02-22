import React, { useMemo } from 'react';

import Image from 'next/image';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useTheme, styled } from '@mui/material/styles';

import { VotingResult } from '../../types/voting';
import { voteListColors } from '../../lib/voteColors';

import { PARTY_LOGOS_LOW_RES } from '../../assets/logos';
import { PartyAbbreviation } from '../../utils/parties';

const PartyPartition = styled('div')<{ background: string }>`
  padding: 0.25rem;
  background-color: ${({ background }) => background};
`;

const Parties = styled('div')`
  display: flex;
  justify-content: center;
  > div {
    margin: 2px;
  }
`;

interface Props {
  votes: VotingResult;
}

const VoteResult: React.FC<Props> = ({ votes }) => {
  const theme = useTheme();

  const colors = useMemo(() => voteListColors[theme.palette.mode], [theme.palette.mode]);

  return (
    <Grid display="flex">
      {votes.no.length || votes.yes.length ? (
        <>
          <Grid item sm={6} xs={12}>
            <PartyPartition background={votes.winner === 'yes' ? colors.yes : colors.losing}>
              <Typography align="center" variant="h5" gutterBottom>
                JA
              </Typography>
              <Parties>
                {votes.yes.map((party: string) => (
                  <div key={party}>
                    <Image
                      src={PARTY_LOGOS_LOW_RES[party.toUpperCase() as PartyAbbreviation]}
                      width="40%"
                      height="40%"
                      alt={`${party} logo`}
                    />
                  </div>
                ))}
              </Parties>
            </PartyPartition>
          </Grid>

          <Grid item sm={6} xs={12}>
            <PartyPartition background={votes.winner === 'no' ? colors.no : colors.losing}>
              <Typography align="center" variant="h5" gutterBottom>
                NEJ
              </Typography>
              <Parties>
                {votes.no.map((party: string) => (
                  <div key={party}>
                    <Image
                      src={PARTY_LOGOS_LOW_RES[party.toUpperCase() as PartyAbbreviation]}
                      width="40%"
                      height="40%"
                      alt={`${party} logo`}
                    />
                  </div>
                ))}
              </Parties>
            </PartyPartition>
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
