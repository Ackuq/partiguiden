import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, Slide } from '@material-ui/core';
import Cookies from 'universal-cookie';

import { Router } from '../../../../lib/routes';
import styles from './styles';

const cookies = new Cookies();

const CookieBanner = ({ classes }) => {
  const [cookieConsent, setCookieConsent] = useState(true);

  useEffect(() => {
    if (!cookies.get('consent')) setCookieConsent(false);
  }, []);

  return (
    <React.Fragment>
      <Slide direction="up" in={!cookieConsent} mountOnEnter unmountOnExit>
        <Paper square classes={{ root: classes.cookieBannerContainer }}>
          <div>
            <h4 className={classes.cookieText}>
              Partiguiden.nu använder kakor för att anonymt analysera användares interaktion av
              hemsidan.
            </h4>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => Router.pushRoute('kakpolicy')}
              >
                Läs mer
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                classes={{ root: classes.acceptButton }}
                onClick={() => {
                  setCookieConsent(true);
                  cookies.set('consent', true, { path: '/' });
                }}
              >
                Jag godkänner
              </Button>
            </div>
          </div>
        </Paper>
      </Slide>
    </React.Fragment>
  );
};

export default withStyles(styles)(CookieBanner);
