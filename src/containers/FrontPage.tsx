import React from 'react';

import { Card, CardContent, Typography, Stack } from '@mui/material';

import Featured from '../components/Featured';

import { SubjectListEntry } from '../types/subjects';

interface Props {
  popular: Array<SubjectListEntry>;
}

const FrontPage: React.FC<Props> = ({ popular }) => (
  <Stack spacing={3}>
    <Card>
      <CardContent>
        <Typography variant="h4" paragraph align="center">
          Vilket parti ska man rösta på?
        </Typography>
        <Typography variant="body1" paragraph>
          Vilket parti ska man rösta på? Och vad tycker partierna egentligen? På Partiguiden kan du
          läsa om vad partierna tycker enligt sina partiprogram och samt se hur de röstar i
          riksdagsvoteringar.
        </Typography>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <Typography variant="h5" paragraph align="center">
          Mest besökta ämnen de senaste 30 dagarna
        </Typography>
        <Featured popular={popular} />
      </CardContent>
    </Card>
  </Stack>
);

export default FrontPage;
