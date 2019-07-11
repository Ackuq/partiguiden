import React from 'react';
import Router from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { Grid, Paper, Typography, ButtonBase, Box } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './styles';

const useStyles = makeStyles(styles);

const Member = ({ member, show }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={6} xl={4} style={show ? null : { display: 'none' }}>
      <ButtonBase
        component="a"
        style={{ borderRadius: '4px', display: 'flex' }}
        href={`/ledamot/${member.id}`}
        onClick={event => {
          event.preventDefault();
          Router.push(`/ledamot/${member.id}`);
        }}
      >
        <Paper classes={{ root: classes.memberCard }}>
          <Box>
            <Typography gutterBottom color="primary" variant="body1">
              {member.status}
            </Typography>

            <Typography color="primary" variant="subtitle2">
              Valkrets
            </Typography>
            <Typography gutterBottom color="primary" variant="body2">
              {member.valkrets}
            </Typography>

            <Typography color="primary" variant="subtitle2">
              Ålder
            </Typography>
            <Typography color="primary" variant="body2">
              {member.alder}
            </Typography>
          </Box>
          <Box
            alt="Bild på ledamot"
            borderRadius="50%"
            width={175}
            height={175}
            style={{ background: `url(${member.bild_url}) 50% 25% no-repeat` }}
            className={classes.memberImage}
          >
            {member.parti !== '-' && (
              <Box position="absolute" right={0} top={0} p={1}>
                <img
                  width={50}
                  height={50}
                  className={classes.partySymbol}
                  src={`../../static/images/party-logos/${member.parti.toUpperCase()}.svg`}
                  alt="Partisymbol"
                />
              </Box>
            )}
          </Box>

          <Box
            p={1}
            position="absolute"
            width="100%"
            bottom={0}
            left={0}
            className={classes.textContainer}
          >
            <span className={classes.name}>{member.namn}</span>
          </Box>
        </Paper>
      </ButtonBase>
    </Grid>
  );
};
Member.propTypes = {
  member: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Member;
