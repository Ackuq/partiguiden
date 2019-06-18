import React, { useState } from 'react';
import { Collapse, ButtonBase, Grid, Typography } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';
import PropTypes from 'prop-types';

import { getPartyColor } from '../../../../utils/getParties';
import PartyOpinion from '../PartyOpinion';
import styles from './styles';

const useStyles = makeStyles(styles);

const PartyComponent = ({ party }) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const partyColor = getPartyColor(party.name);

  const PartyTitle = styled(ButtonBase)({
    border: `2px solid ${partyColor}`,
    width: '100%',
    borderRadius: '3rem',
    textAlign: 'center',
    padding: '0.75rem 0',
    backgroundColor: grey[100],
    '&:hover': {
      backgroundColor: grey[200]
    }
  });

  return (
    <React.Fragment>
      {party.data && (
        <div key={`${party.name}`} id={`${party.name}`} className={classes.partyStandpoint}>
          <PartyTitle onClick={() => setVisible(!visible)}>
            <Typography variant="h3" style={{ fontWeight: 300 }}>
              {party.name}
            </Typography>
          </PartyTitle>
          <Collapse in={visible} classes={{ container: classes.collapse }}>
            <Grid container spacing={3} style={{ marginTop: '0.5rem' }}>
              {party.data.map(subject => (
                <PartyOpinion
                  subject={subject}
                  partyName={party.name}
                  partyColor={partyColor}
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

PartyComponent.propTypes = {
  party: PropTypes.object.isRequired
};

export default PartyComponent;
