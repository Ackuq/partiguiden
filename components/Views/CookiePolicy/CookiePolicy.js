import React from 'react';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const CookiePolicy = () => (
  <React.Fragment>
    <Head>
      <title>Kakpolicy | Partiguiden.nu</title>
      <meta
        name="description"
        content="Partiguiden.nu erbjuder en platform där du kan jämföra vad olika partier tycker i sakfrågor för att det ska bli lättare att hitta det parti du sympatiserar med mest."
      />
    </Head>
    <div className="list-title text-center">
      <AnnouncementIcon style={{ fontSize: '2.5rem' }} />
      <h1>Kakpolicy</h1>
    </div>
    <div className="container">
      <Card>
        <CardContent>
          <Typography variant="subtitle1" paragraph>
            Partiguiden.nu använder webbkakor från Google för att kunna analysera användares
            interaktion med hemsidan i syftet att kunna vidareutveckla sidan.
          </Typography>
          <Typography variant="subtitle1" paragraph>
            Informationen som delas är krypterad och helt anonym, vi kan alltså inte identifera
            användare.
          </Typography>
        </CardContent>
      </Card>
    </div>
  </React.Fragment>
);

export default CookiePolicy;
