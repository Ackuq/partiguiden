import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import Slide from '@material-ui/core/Slide';

import { Link } from '../../../../../lib/routes';
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
              <Button color="inherit" variant="outlined">
                <Link route="kakpolicy">
                  <a style={{ color: 'inherit' }}>Läs mer</a>
                </Link>
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
