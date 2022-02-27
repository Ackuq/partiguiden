import React, { useMemo } from 'react';

import Image from 'next/image';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useTheme, styled, Breakpoints } from '@mui/material/styles';

import { VotingResult } from '../../types/voting';
import { voteListColors } from '../../lib/voteColors';

import { PARTY_LOGOS_LOW_RES } from '../../assets/logos';
import { PartyAbbreviation } from '../../utils/parties';
import { useMediaQuery } from '@mui/material';

const Party = styled('div')`
  padding-left: 4px;
  padding-right: 4px;
`;

const PartyContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

interface ResultColumnProps {
  bgcolor: string;
  votes: string[];
  title: string;
  breakpoints: Breakpoints;
}

const ResultColumn: React.FC<ResultColumnProps> = ({ bgcolor, votes, title, breakpoints }) => {
  const smallDevice = useMediaQuery(breakpoints.down('md'));

  const imageSize = smallDevice ? 32 : 48;

  return (
    <Grid item sm={6} xs={12} sx={{ bgcolor }} padding={0.5}>
      <Typography align="center" variant="h5" gutterBottom>
        {title}
      </Typography>
      <PartyContainer>
        {votes.map((party: string) => (
          <Party key={party}>
            <Image
              src={PARTY_LOGOS_LOW_RES[party.toUpperCase() as PartyAbbreviation]}
              width={imageSize}
              height={imageSize}
              alt={`${party} logo`}
            />
          </Party>
        ))}
      </PartyContainer>
    </Grid>
  );
};

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
          <ResultColumn
            bgcolor={votes.winner === 'yes' ? colors.yes : colors.losing}
            title="JA"
            votes={votes.yes}
            breakpoints={theme.breakpoints}
          />
          <ResultColumn
            bgcolor={votes.winner === 'no' ? colors.no : colors.losing}
            title="NEJ"
            votes={votes.no}
            breakpoints={theme.breakpoints}
          />
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
