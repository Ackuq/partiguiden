import React from 'react';
import Link from 'next/link';

import { Grid, ButtonBase, Typography } from '@material-ui/core';
import styled from '@emotion/styled';

import { getStandpointHref, STANDPOINT } from '../lib/routes';
import { SubjectListEntry } from '../types/subjects';

const FeaturedButton = styled(ButtonBase)`
  width: 100%;
  text-align: center;
  box-shadow: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.shadows[5] : theme.shadows[2]};
  font-weight: normal;
  padding: 1rem;
  display: flex;
  flex-grow: 1;
  :hover {
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100]};
  }
`;

const ButtonText = styled(Typography)`
  color: ${({ theme }) =>
    theme.palette.mode === 'dark'
      ? theme.palette.primary.contrastText
      : theme.palette.primary.main};
`;

interface Props {
  popular: Array<SubjectListEntry>;
}

const Featured: React.FC<Props> = ({ popular }) => {
  return (
    <Grid container spacing={3}>
      {popular.map((subject) => (
        <Grid key={subject.id} item xs={12} md={6}>
          <Link href={STANDPOINT} as={getStandpointHref(subject.id)} passHref>
            <FeaturedButton>
              <ButtonText variant="button">{subject.name}</ButtonText>
            </FeaturedButton>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Featured;
