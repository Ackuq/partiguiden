import React, { useState } from 'react';
/* Material UI components */
import { Collapse, ButtonBase, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

/* Custom components */
import PartyOpinion from '../PartyOpinion';

import styles from './styles';

const PartyComponent = ({ classes, party }) => {
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      {party.data && (
        <div key={`${party.name}`} id={`${party.name}`} className={classes.partyStandpoint}>
          <ButtonBase onClick={() => setVisible(!visible)} classes={{ root: classes.partyTitle }}>
            <h3>{party.name}</h3>
          </ButtonBase>
          <Collapse in={visible} classes={{ container: classes.collapse }}>
            <Grid container spacing={3} style={{ marginTop: '0.5rem' }}>
              {party.data.map(subject => (
                <PartyOpinion
                  subject={subject}
                  partyName={party.name}
                  key={`${party.name}${subject.name}`}
                />
              ))}
            </Grid>
          </Collapse>
        </div>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(PartyComponent);
