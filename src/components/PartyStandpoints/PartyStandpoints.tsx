import React, { useState } from 'react';

import { Typography, Collapse, ButtonBase, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import ArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';

import PartyStandpoint from './PartyStandpoint';

import { PartyInfo } from '../../utils/parties';
import { Standpoint } from '../../types/subjects';

const PartyContainer = styled('div')`
  margin-bottom: 1.5rem;
`;

const PartyTitle = styled(ButtonBase)<{ color: string }>`
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem;
  border-bottom: ${({ color }) => `2px solid ${color}`};
`;

const Arrow = styled(ArrowDownRounded)<{ visible: 'true' | 'false'; arrowcolor: string }>`
  transition: transform 0.25s ease-in-out;
  font-size: 2rem;
  color: ${({ arrowcolor }) => arrowcolor};
  transform: rotate(${({ visible }) => (visible === 'true' ? '180deg' : '0')});
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
        color={partyColor}
      >
        <>
          <Typography
            variant="h4"
            style={{ fontWeight: 300, marginBottom: '0.25rem', marginTop: '0.25rem' }}
          >
            {party.name}
          </Typography>
          <Arrow arrowcolor={partyColor} visible={visible.toString() as 'true' | 'false'} />
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
        <Stack spacing={3} sx={{ marginTop: '1rem' }}>
          {standpoints.map((standpoint) => (
            <PartyStandpoint
              standpoint={standpoint}
              party={party}
              key={`${party.name}${standpoint.title}`}
            />
          ))}
        </Stack>
      </Collapse>
    </PartyContainer>
  );
};

export default PartyStandpoints;
