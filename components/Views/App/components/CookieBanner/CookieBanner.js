import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';

import { useStateValue } from '../../../../../lib/stateProvider';

import styles from './styles';

const cookies = new Cookies();

const CookieBanner = ({ classes }) => {
  const [{ cookieConsent }, dispatch] = useStateValue();

  return (
    <React.Fragment>
      {!cookieConsent && (
        <Paper square classes={{ root: classes.cookieBannerContainer }}>
          <div>
            <h4 className={classes.cookieText}>
              Partiguiden.nu använder kakor för att anonymt analysera användares interaktion av
              hemsidan.
            </h4>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button color="inherit" variant="outlined">
                Läs mer
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                classes={{ root: classes.acceptButton }}
                onClick={() => {
                  cookies.set('consent', true, { path: '/' });
                  dispatch({ type: 'ACCEPT_COOKIES' });
                }}
              >
                Jag godkänner
              </Button>
            </div>
          </div>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(CookieBanner);
