import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import { array } from 'prop-types';

import ListObject from './components/ListObject';

import styles from './styles';

const useStyles = makeStyles(styles);

const PartiernasStandpunkter = ({ subjects }) => {
  const classes = useStyles();
  return (
    <Grid container classes={{ container: classes.subjectList }}>
      {subjects.map(subject => (
        <ListObject
          subject={Object.assign({
            id: subject.id,
            name: subject.name
          })}
          key={`${subject.id}`}
        />
      ))}
    </Grid>
  );
};

PartiernasStandpunkter.propTypes = { subjects: array.isRequired };

export default PartiernasStandpunkter;
