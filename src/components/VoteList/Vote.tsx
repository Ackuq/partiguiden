import React from 'react';
import Router from 'next/router';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import useStyles from './useStyles';
import { lookupAuthority } from '../../utils';
import VoteResult from './VoteResult';
import { VoteListEntry } from '../../types/voting';

interface Props {
  vote: VoteListEntry;
  classes: ReturnType<typeof useStyles>;
}

const Vote: React.FC<Props> = ({ vote, classes }) => {
  const authority = lookupAuthority(vote.authority);

  return (
    <Card elevation={1} style={{ flex: 1 }}>
      <ButtonBase
        style={{ display: 'block' }}
        href={`/votering/${vote.documentId}/${vote.proposition}`}
        component="a"
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          event.preventDefault();
          Router.push('/votering/[id]/[bet]', `/votering/${vote.documentId}/${vote.proposition}`);
        }}
      >
        <CardHeader
          title={authority.desc}
          style={{ background: authority.color }}
          classes={{
            title: classes.headerTitle,
            root: classes.headerRoot,
          }}
        />
        <CardContent>
          <Typography
            variant="h3"
            color="textSecondary"
            align="left"
            gutterBottom
            classes={{ h3: classes.title }}
          >
            {vote.title}
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            align="left"
            classes={{ h6: classes.subtitle }}
          >
            {vote.subtitle}
          </Typography>
        </CardContent>

        <VoteResult votes={vote.results} classes={classes} />
      </ButtonBase>
    </Card>
  );
};

export default Vote;
