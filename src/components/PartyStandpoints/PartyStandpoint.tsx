import React from 'react';

import {
  Button,
  Card,
  CardContent,
  Typography,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { PartyInfo } from '../../utils/parties';
import { Standpoint } from '../../types/subjects';

const ListBox = styled(ListItemIcon)`
  position: absolute;
  left: -0.125rem;
  top: 1.275rem;
  min-width: 6px;
  min-height: 6px;
`;

interface Props {
  party: PartyInfo;
  standpoint: Standpoint;
}

const PartyOpinion: React.FC<Props> = ({ party, standpoint }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          {standpoint.title}
        </Typography>
        <List>
          {standpoint.content.map((opinion) => (
            <ListItem key={`${party.name}${standpoint.title}${opinion}`}>
              <ListBox style={{ backgroundColor: party.color }} />
              <ListItemText>{opinion}</ListItemText>
            </ListItem>
          ))}
        </List>
        <Button component="div">
          <Link
            href={standpoint.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            Läs mer på partiets hemsida
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PartyOpinion;
