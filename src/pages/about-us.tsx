import { NextPage } from 'next';
import Head from 'next/head';

import InfoIcon from '@mui/icons-material/Info';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import MUILink from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import {
  githubAdmin,
  githubBackend,
  githubFrontend,
  githubProfile,
  linkedIn,
} from '../lib/socials';
import PageTitle from '../components/PageTitle';
import React from 'react';

const Link: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <MUILink href={href} rel="noopener noreferrer" target="_blank">
    {children}
  </MUILink>
);

const OmOssContainer: NextPage = () => (
  <>
    <Head>
      <title>Om oss | Partiguiden</title>
      <meta
        name="description"
        content="Partiguiden erbjuder en platform där du kan jämföra vad olika partier tycker i sakfrågor för att det ska bli lättare att hitta det parti du sympatiserar med mest."
      />
    </Head>
    <PageTitle title="Om oss" Icon={InfoIcon} />
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h3" gutterBottom>
            Om Partiguiden
          </Typography>
          <Typography variant="subtitle1" paragraph>
            Denna tjänst är skapad och underhålls av Axel Pettersson (
            <Link href={linkedIn}>LinkedIn</Link>, <Link href={githubProfile}>GitHub</Link>).
          </Typography>
          <Typography variant="subtitle1" paragraph>
            Partiguiden skapades med syftet av att kunna erbjuda en plattform där man lätt kan kolla
            upp partiernas ståndpunkter i olika ämnen och sakfrågor. Under utvecklingen av hemsidan
            togs det hänsyn till begriplighet och användarvänlighet för att kunna erbjuda den bästa
            möjliga användarupplevensen.
          </Typography>
          <Typography variant="subtitle1" paragraph>
            Utvecklingen av sidan påbörjades som ett fritidsprojekt år 2017 för att utveckla
            kunskaper inom webbutveckling.
          </Typography>
          <Typography variant="h3">Datakällor</Typography>
          <Typography variant="subtitle1" paragraph>
            Informationen som presenteras på sidan är information från partiernas egna hemsidor samt
            information från&nbsp;
            <Link href="https://data.riksdagen.se/">Riksdagens öppna API</Link>. Viss data om
            partierna är tagen från <Link href="https://wikipedia.se/">Wikipedia</Link>.
          </Typography>
          <Typography variant="h3" gutterBottom>
            Annonser
          </Typography>
          <Typography variant="subtitle1" paragraph>
            I dagsläget är detta projekt finansierat av de annonser som visas på diverse delsidor.
            Annonserna hanteras av Google via deras annonssystem&nbsp;
            <Link href="https://www.google.com/adsense/start/">AdSense</Link>.
          </Typography>
          <Typography variant="h3" gutterBottom>
            Open source
          </Typography>
          <Typography variant="subtitle1">
            För att kunna uppnå en god nivå av förtrående och transparans så är alla delar av detta
            projekt open source på GitHub. Här ligger både koden för&nbsp;
            <Link href={githubFrontend}>hemsidan</Link>, <Link href={githubBackend}>backend</Link>,
            samt den <Link href={githubAdmin}>internt använda adminpanelen</Link>.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  </>
);

export default OmOssContainer;
