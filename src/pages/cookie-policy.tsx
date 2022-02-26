import { NextPage } from 'next';
import Head from 'next/head';

import AnnouncementIcon from '@mui/icons-material/Announcement';

import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';

import PageTitle from '../components/PageTitle';

const CookiePolicy: NextPage = () => (
  <>
    <Head>
      <title>Kakpolicy | Partiguiden</title>
      <meta
        name="description"
        content="Partiguiden erbjuder en platform där du kan jämföra vad olika partier tycker i sakfrågor för att det ska bli lättare att hitta det parti du sympatiserar med mest."
      />
    </Head>
    <PageTitle title="Kakpolicy" Icon={AnnouncementIcon} />
    <Container>
      <Card>
        <CardContent>
          <Typography variant="subtitle1" paragraph>
            Partiguiden använder webbkakor från Google för att kunna analysera användares
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
