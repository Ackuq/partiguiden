import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';

import { apiLinks } from '../../utils';

const OmOss = () => (
  <Card>
    <CardContent>
      <Typography variant="subtitle1" paragraph>
        Partiguiden.nu skapades med syftet av att kunna erbjuda en plattform där man lätt kan kolla
        upp partiernas ståndpunkter i olika ämnen och sakfrågor. Under utvecklingen av hemsidan togs
        det hänsyn till begriplighet och användarvänlighet för att kunna erbjuda den bästa möjliga
        användarupplevensen.
      </Typography>
      <Typography variant="subtitle1" paragraph>
        Utvecklingen av sidan påbörjades som ett fritidsprojekt år 2017 för att utveckla kunskaper
        inom webbutveckling.
      </Typography>
      <Typography variant="subtitle1" paragraph>
        Informationen som presenteras på sidan är information från partiernas egna hemsidor samt
        information från Riksdagens öppna API, som finns på{' '}
        <a rel="noopener noreferrer" target="_blank" href={apiLinks.riksdagenApi}>
          {apiLinks.riksdagenApi}
        </a>
      </Typography>
    </CardContent>
  </Card>
);

export default OmOss;
