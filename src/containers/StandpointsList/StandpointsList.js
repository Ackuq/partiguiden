import React from 'react';
import Grid from '@material-ui/core/Grid';
import { array } from 'prop-types';

import StandpointObject from './StandpointObject';

import useStyles from './useStyles';

const PartiernasStandpunkter = ({ subjects }) => {
  const classes = useStyles();
  return (
    <Grid container classes={{ container: classes.subjectList }}>
      {subjects.map(subject => (
        <Grid item xs={12} md={6} className={classes.item} key={subject.id}>
          <StandpointObject classes={classes} subject={{ id: subject.id, name: subject.name }} />
        </Grid>
      ))}
    </Grid>
  );
};

PartiernasStandpunkter.propTypes = { subjects: array.isRequired };

export default PartiernasStandpunkter;
