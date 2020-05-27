import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import InfoIcon from '@material-ui/icons/Info';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import PageTitle from '../src/components/PageTitle';
import { baseUrl as parlimentUrl } from '../src/lib/parlimentApi';

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
          <Typography variant="subtitle1" paragraph>
            Informationen som presenteras på sidan är information från partiernas egna hemsidor samt
            information från Riksdagens öppna API, som finns på{' '}
            <a rel="noopener noreferrer" target="_blank" href={parlimentUrl}>
              {parlimentUrl}
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  </>
);

export default OmOssContainer;
