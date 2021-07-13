import React, { useState } from 'react';

import { Typography, Collapse, ButtonBase, Grid } from '@material-ui/core';
import styled from '@emotion/styled';

import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';

import PartyStandpoint from './PartyStandpoint';

import { PartyInfo } from '../../utils/parties';
import { Standpoint } from '../../types/subjects';

const PartyContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const PartyTitle = styled(ButtonBase)<{ partyColor: string }>`
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem;
  border-bottom: ${({ partyColor }) => `2px solid ${partyColor}`};
`;

const Arrow = styled(ArrowDownRounded)<{ visible: boolean; partyColor: string }>`
  transition: transform 0.25s ease-in-out;
  font-size: 2rem;
  color: ${({ partyColor }) => partyColor};
  transform: rotate(${({ visible }) => (visible ? '180deg' : '0')});
`;

interface Props {
  standpoints: Array<Standpoint>;
  party: PartyInfo;
}

const PartyStandpoints: React.FC<Props> = ({ standpoints, party }) => {
  const [visible, setVisible] = useState(false);
  const partyColor = party.color || 'red';

  const handleClick = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <PartyContainer key={party.name} id={party.name}>
      <PartyTitle
        onClick={handleClick}
        aria-expanded={visible}
        aria-label="Show more"
        partyColor={partyColor}
      >
        <>
          <Typography
            variant="h4"
            style={{ fontWeight: 300, marginBottom: '0.25rem', marginTop: '0.25rem' }}
          >
            {party.name}
          </Typography>
          <Arrow partyColor={partyColor} visible={visible} />
        </>
      </PartyTitle>
      <Collapse
        in={visible}
        sx={{
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
        }}
        timeout="auto"
        unmountOnExit
      >
        <Grid container spacing={3} style={{ marginTop: '0.5rem' }}>
          {standpoints.map((standpoint) => (
            <PartyStandpoint
              standpoint={standpoint}
              party={party}
              key={`${party.name}${standpoint.title}`}
            />
          ))}
        </Grid>
      </Collapse>
    </PartyContainer>
  );
};

export default PartyStandpoints;
