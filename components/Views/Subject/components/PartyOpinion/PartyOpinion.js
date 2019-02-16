import React from 'react';
import Link from 'next/link';

/* Material UI components */
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default ({ partyName, subject }) => (
  <Grid item xs={12}>
    <Card>
      <CardContent>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          {subject.name}
        </Typography>
        <ul>
          {subject.opinions.map(opinion => (
            <li className="partyOpinions" key={`${partyName}${subject.name}${opinion}`}>
              <Typography variant="body1">{opinion}</Typography>
            </li>
          ))}
        </ul>
        <Button component="div">
          <Link href={`${subject.url}`}>
            <a target="_blank" className="d-flex p-1 m-1">
              Läs mer på partiets hemsida
            </a>
          </Link>
        </Button>
      </CardContent>
    </Card>
  </Grid>
);
