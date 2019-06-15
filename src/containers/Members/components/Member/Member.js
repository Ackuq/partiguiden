import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

import { Link } from '../../../../lib/routes';
import styles from './styles';

const Member = ({ member, classes }) => (
  <Grid item xs={12} sm={6}>
    <Link route="ledamot" params={{ id: member.intressent_id }}>
      <a>
        <Paper elevation={2} classes={{ root: classes.memberCard }}>
          <div className={classes.memberInfo}>
            <div>
              <b>
                <span>Valkrets</span>
              </b>
              <br />
              <span>{member.valkrets}</span>
            </div>
            <div>
              <b>
                <span>Ålder</span>
              </b>
              <br />
              <span>{new Date().getFullYear() - member.fodd_ar}</span>
            </div>
          </div>
          <div
            alt="Bild på ledamot"
            style={{ background: `url(${member.bild_url_192}) 50% 50% no-repeat` }}
            className={classes.memberImage}
          >
            <img
              className={classes.partySymbol}
              src={`../../static/images/party-logos/${member.parti.toUpperCase()}.svg`}
              alt="Partisymbol"
            />
          </div>
          <div className={classes.textContainer}>
            <span className={classes.name}>
              {member.tilltalsnamn} {member.efternamn}
            </span>
          </div>
        </Paper>
      </a>
    </Link>
  </Grid>
);

export default withStyles(styles)(Member);
