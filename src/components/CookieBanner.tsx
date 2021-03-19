import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import styled from '@material-ui/styles/styled';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core';

import { COOKIE_POLICY } from '../lib/routes';

const CookieBannerContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
  color: '#fff',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  padding: '2rem 0.125rem',
  zIndex: 9999,
}));

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1rem',
});

const COOKIE_CONSENT_KEY = 'cookie_consent';

const CookieBanner: React.FC = () => {
  const [cookieConsent, setCookieConsent] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
      setCookieConsent(false);
    }
  }, []);

  return (
    <>
      <Slide direction="up" in={!cookieConsent} mountOnEnter unmountOnExit>
        <CookieBannerContainer square>
          <Typography variant="h6" align="center">
            Partiguiden använder kakor för att anonymt analysera användares interaktion med
            hemsidan.
          </Typography>
          <ButtonContainer>
            <Button
              color="inherit"
              variant="outlined"
              style={{
                marginRight: '3px',
              }}
            >
              <Link href={COOKIE_POLICY}>
                <Typography component="a" variant="button">
                  Läs mer
                </Typography>
              </Link>
            </Button>
            <Button
              style={{
                marginLeft: '3px',
              }}
              color="inherit"
              variant="outlined"
              onClick={() => {
                setCookieConsent(true);
                localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(true));
              }}
            >
              Jag godkänner
            </Button>
          </ButtonContainer>
        </CookieBannerContainer>
      </Slide>
    </>
  );
};

export default CookieBanner;
