import React from 'react';
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { styled } from '@material-ui/styles';

const PartyOpinion = ({ partyName, subject, partyColor }) => {
  const ListBox = styled(ListItemIcon)({
    position: 'absolute',
    left: '-0.125rem',
    top: '1.275rem',
    minWidth: '6px',
    minHeight: '6px',
    backgroundColor: partyColor
  });

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
                <ListBox>
                  <React.Fragment />
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
