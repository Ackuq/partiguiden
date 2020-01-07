import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import AnnouncementIcon from '@material-ui/icons/Announcement';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import PageTitle from '../src/components/PageTitle';

const CookiePolicy: NextPage = () => (
  <>
    <Head>
      <title>Kakpolicy | Partiguiden.nu</title>
      <meta
        name="description"
        content="Partiguiden.nu erbjuder en platform där du kan jämföra vad olika partier tycker i sakfrågor för att det ska bli lättare att hitta det parti du sympatiserar med mest."
      />
    </Head>
    <PageTitle title="Kakpolicy" Icon={AnnouncementIcon} />
    <Container>
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
    </Container>
  </>
);

export default CookiePolicy;
