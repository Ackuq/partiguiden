import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import styles from './styles';

const MemberList = ({ classes, members, width }) => (
  <GridList cellHeight={200} spacing={isWidthUp('sm', width) ? 10 : 20} cols={3}>
    {members.map(member => (
      <GridListTile
        classes={{ tile: classes.tile, imgFullWidth: classes.fullHeight }}
        cols={isWidthUp('sm', width) ? 1 : 3}
      >
        <img src={member.bild_url_192} alt="Bild på ledamot" />
        <GridListTileBar
          title={`${member.tilltalsnamn} ${member.efternamn}`}
          classes={{ title: classes.tileTitle }}
        />
      </GridListTile>
    ))}
  </GridList>
);

export default withWidth()(withStyles(styles)(MemberList));
