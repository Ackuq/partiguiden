import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';

const CookiePolicy = () => (
  <Card>
    <CardContent>
      <Typography variant="subtitle1" paragraph>
        Partiguiden.nu använder webbkakor från Google för att kunna analysera användares interaktion
        med hemsidan i syftet att kunna vidareutveckla sidan.
      </Typography>
      <Typography variant="subtitle1" paragraph>
        Informationen som delas är krypterad och helt anonym, vi kan alltså inte identifera
        användare.
      </Typography>
    </CardContent>
  </Card>
);

export default CookiePolicy;
