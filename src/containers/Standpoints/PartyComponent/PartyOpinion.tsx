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

interface Props {
  partyName: string;
  subject: any;
  partyColor: string;
}

const ListBox = styled(ListItemIcon)({
  position: 'absolute',
  left: '-0.125rem',
  top: '1.275rem',
  minWidth: '6px',
  minHeight: '6px',
});

const PartyOpinion: React.FC<Props> = ({ partyName, subject, partyColor }) => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            {subject.name}
          </Typography>
          <List>
            {subject.opinions.map(opinion => (
              <ListItem key={`${partyName}${subject.name}${opinion}`}>
                <ListBox style={{ backgroundColor: partyColor }}>
                  <></>
                </ListBox>
                <ListItemText>{opinion}</ListItemText>
              </ListItem>
            ))}
          </List>
          <Button component="div">
            <Link
              href={subject.url}
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
