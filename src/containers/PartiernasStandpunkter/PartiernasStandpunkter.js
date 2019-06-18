import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/styles';
import ListObject from './components/ListObject';
import LoadCircle from '../../components/LoadCircle';

import { useStateValue } from '../../lib/stateProvider';

import styles from './styles';

const useStyles = makeStyles(styles);

const PartiernasStandpunkter = () => {
  const classes = useStyles();
  const [subjects, setSubjects] = useState(null);
  const { subjectData } = useStateValue()[0];

  useEffect(() => {
    subjectData.then(data => {
      setSubjects(data);
    });
  }, []);

  return (
    <React.Fragment>
      {subjects ? (
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
      ) : (
        <LoadCircle />
      )}
    </React.Fragment>
  );
};

export default PartiernasStandpunkter;
