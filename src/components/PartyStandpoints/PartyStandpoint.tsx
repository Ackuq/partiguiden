import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { styled } from '@material-ui/styles';

import { PartyInfo } from '../../utils/getParties';
import { Standpoint } from '../../types/subjects';

const ListBox = styled(ListItemIcon)({
  position: 'absolute',
  left: '-0.125rem',
  top: '1.275rem',
  minWidth: '6px',
  minHeight: '6px',
});

interface Props {
  party: PartyInfo;
  standpoint: Standpoint;
}

const PartyOpinion: React.FC<Props> = ({ party, standpoint }) => {
  return (
    <Grid item xs={12}>
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
    </Grid>
  );
};

export default PartyOpinion;
