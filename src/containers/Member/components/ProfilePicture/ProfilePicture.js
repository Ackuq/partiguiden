import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import Breadcrumbs from '../../../../components/Breadcrumbs';
import styles from './styles';

const ProfilePicture = ({ src, classes, name, status, age, parti }) => (
  <React.Fragment>
    <div className={classes.pictureContainer}>
      <div className={classes.breadcrumbs}>
        <Breadcrumbs
          links={[{ label: 'Ledamöter', href: '/ledamoter' }, { label: 'Ledamot', href: '#' }]}
        />
      </div>

      <div
        style={{ background: `url(${src}) 50% 25% no-repeat` }}
        className={classes.profilePicture}
      >
        {parti !== '-' && (
          <img
            className={classes.partySymbol}
            src={`../../static/images/party-logos/${parti.toUpperCase()}.svg`}
            alt="Partisymbol"
          />
        )}
      </div>
    </div>
    <div className={classes.nameContainer}>
      <Typography variant="h6">{status}</Typography>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h6" color="textPrimary">
        {age} år
      </Typography>
    </div>
  </React.Fragment>
);

ProfilePicture.propTypes = {
  src: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  parti: PropTypes.string.isRequired
};

export default withStyles(styles)(ProfilePicture);
