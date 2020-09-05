import React, { useState } from 'react';

import Collapse from '@material-ui/core/Collapse';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';

import { getPartyColor } from '../../utils/getParties';
import PartyOpinion from './PartyOpinion';
import useStyles from './useStyles';
import { PartySubject } from '../../types/party';

interface Props {
  party: PartySubject;
}

const PartyComponent: React.FC<Props> = ({ party }) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const partyColor = getPartyColor(party.name) || 'red';

  const handleClick = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <div key={party.name} id={party.name} className={classes.partyContainer}>
      <ButtonBase
        onClick={handleClick}
        aria-expanded={visible}
        aria-label="Show more"
        classes={{ root: classes.partyTitle }}
        style={{ borderBottom: `2px solid ${partyColor}` }}
      >
        <>
          <Typography
            variant="h4"
            style={{ fontWeight: 300, marginBottom: '0.25rem', marginTop: '0.25rem' }}
          >
            {party.name}
          </Typography>
          <ArrowDownRounded
            style={{ color: partyColor }}
            classes={{ root: `${classes.arrow} ${visible ? classes.shown : ''}` }}
          />
        </>
      </ButtonBase>
      <Collapse in={visible} classes={{ container: classes.collapse }} timeout="auto" unmountOnExit>
        <Grid container spacing={3} style={{ marginTop: '0.5rem' }}>
          {party.data.map((subject) => (
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

export default PartyComponent;
