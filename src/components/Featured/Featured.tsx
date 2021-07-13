import React from 'react';
import Link from 'next/link';

import { Theme, Grid, ButtonBase, Typography } from '@material-ui/core';
import { makeStyles, styled, createStyles } from '@material-ui/core/styles';

import { getStandpointHref, STANDPOINT } from '../../lib/routes';
import { SubjectListEntry } from '../../types/subjects';

const styles = (theme: Theme) =>
  createStyles({
    featured: {
      width: '100%',
      textAlign: 'center',
      boxShadow: theme.palette.mode === 'dark' ? theme.shadows[5] : theme.shadows[2],
      fontWeight: 'normal',
      padding: '1rem',
      display: 'flex',
      flexGrow: 1,
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
      },
    },
  });

const ButtonText = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color:
    theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : theme.palette.primary.main,
}));

const useStyles = makeStyles(styles);

interface Props {
  popular: Array<SubjectListEntry>;
}

const Featured: React.FC<Props> = ({ popular }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {popular.map((subject) => (
        <Grid key={subject.id} item xs={12} md={6}>
          <Link href={STANDPOINT} as={getStandpointHref(subject.id)} passHref>
            <ButtonBase className={classes.featured}>
              <ButtonText variant="button">{subject.name}</ButtonText>
            </ButtonBase>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Featured;
