import React from 'react';
/* Import icon */
import InfoIcon from '@material-ui/icons/Info';
/* Next.js Head component */
import Head from 'next/head';
/* Material UI import */
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const OmOss = () => (
  <React.Fragment>
    <Head>
      <title>Om oss | Partiguiden.nu</title>
      <meta
        name="description"
        content="Partiguiden.nu erbjuder en platform där du kan jämföra vad olika partier tycker i sakfrågor för att det ska bli lättare att hitta det parti du sympatiserar med mest."
      />
    </Head>
    <div className="list-title text-center">
      <InfoIcon style={{ fontSize: '2.5rem' }} />
      <h1>Om oss</h1>
    </div>
    <div className="container">
      <Card>
        <CardContent>
          <Typography variant="subtitle1" paragraph>
            Partiguiden.nu skapades med syftet av att kunna erbjuda en plattform där man lätt kan
            kolla upp partiernas ståndpunkter i olika ämnen och sakfrågor. Under utvecklingen av
            hemsidan togs det hänsyn till begriplighet och användarvänlighet för att kunna erbjuda
            den bästa möjliga användarupplevensen.
          </Typography>
          <Typography variant="subtitle1" paragraph>
            Utvecklingen av sidan påbörjades som ett fritidsprojekt år 2017 för att utveckla
            kunskaper inom webbutveckling.
          </Typography>
          <Typography variant="subtitle1" paragraph>
            Informationen som presenteras på sidan är information från partiernas egna hemsidor samt
            information från Riksdagens öppna API, som finns på{' '}
            <a rel="noopener noreferrer" target="_blank" href="https://data.riksdagen.se/">
              https://data.riksdagen.se/
            </a>
          </Typography>
        </CardContent>
      </Card>
    </div>
  </React.Fragment>
);

export default OmOss;
