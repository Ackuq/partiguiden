import React, { useState, useEffect } from 'react';
/* Database */
import Head from 'next/head';

/* Custom Component */

/* Material UI components */
import Grid from '@material-ui/core/Grid';
import NoteIcon from '@material-ui/icons/Note';
/* Styles */
import { withStyles } from '@material-ui/core/styles';
import ListObject from './components/ListObject';
import LoadCircle from '../../LoadCircle';

import { useStateValue } from '../../../lib/stateProvider';

import styles from './styles';

const PartiernasStandpunkter = ({ classes }) => {
  const [subjects, setSubjects] = useState(null);
  const { subjectData } = useStateValue()[0];

  useEffect(() => {
    subjectData.then(data => {
      setSubjects(data);
    });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Partiernas ståndpunkter | Partiguiden.nu 2.0</title>
        <meta
          name="description"
          content="Vad tar Sveriges partier för ståndpunkter i olika ämnen och sakfrågor? Jämför Sveriges partier politik och hitta det parti du sympatiserar mest med nu!"
        />
      </Head>
      <div className="list-title">
        <NoteIcon style={{ fontSize: '2.5rem' }} />
        <h1>Partiernas ståndpunkter</h1>
      </div>
      {subjects ? (
        <Grid container classes={{ container: classes.subjectList }}>
          {subjects.map(subject => (
            <ListObject
              subject={Object.assign({
                id: subject.id,
                name: subject.name
              })}
              key={`${subject}`}
            />
          ))}
        </Grid>
      ) : (
        <LoadCircle />
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(PartiernasStandpunkter);
