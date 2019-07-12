import React, { useState } from 'react';
import { Collapse, ButtonBase, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';

import { getPartyColor } from '../../../../utils/getParties';
import PartyOpinion from '../PartyOpinion';
import styles from './styles';

const useStyles = makeStyles(styles);

const PartyComponent = ({ party }) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const partyColor = getPartyColor(party.name);

  function handleClick() {
    setVisible(prevState => !prevState);
  }

  return (
    <div key={party.name} id={party.name} className={classes.partyContainer}>
      <ButtonBase
        onClick={handleClick}
        aria-expanded={visible}
        aria-label="Show more"
        classes={{ root: classes.partyTitle }}
        style={{ borderBottom: `2px solid ${partyColor}` }}
      >
        <React.Fragment>
          <Typography
            variant="h3"
            style={{ fontWeight: 300, marginBottom: '0.25rem', marginTop: '0.25rem' }}
          >
            {party.name}
          </Typography>
          <ArrowDownRounded
            style={{ color: partyColor }}
            classes={{ root: `${classes.arrow} ${visible ? classes.shown : ''}` }}
          />
        </React.Fragment>
      </ButtonBase>
      <Collapse in={visible} classes={{ container: classes.collapse }} timeout="auto" unmountOnExit>
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
  );
};

PartyComponent.propTypes = {
  party: PropTypes.object.isRequired,
};

export default PartyComponent;
