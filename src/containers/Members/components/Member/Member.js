import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

import { Router } from '../../../../lib/routes';
import styles from './styles';

const useStyles = makeStyles(styles);

const Member = ({ member, show }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} style={show ? null : { display: 'none' }}>
      <Paper
        elevation={2}
        classes={{ root: classes.memberCard }}
        onClick={() => Router.pushRoute('ledamot', { id: member.intressent_id })}
      >
        <div className={classes.memberInfo}>
          <div>
            <span>{member.status}</span>
          </div>
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
          style={{ background: `url(${member.bild_url_192}) 50% 25% no-repeat` }}
          className={classes.memberImage}
        >
          {member.parti !== '-' && (
            <img
              className={classes.partySymbol}
              src={`../../static/images/party-logos/${member.parti.toUpperCase()}.svg`}
              alt="Partisymbol"
            />
          )}
        </div>
        <div className={classes.textContainer}>
          <span className={classes.name}>
            {member.tilltalsnamn} {member.efternamn}
          </span>
        </div>
      </Paper>
    </Grid>
  );
};
Member.propTypes = {
  member: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
};

export default Member;
