import React, { useState } from 'react';

import { useTheme } from '@mui/material/styles';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Documents from './Documents';

import { Information as InformationType, MemberDetailedResponse } from '../../types/member';
import { ResponsiveAd } from '../Ad';

interface Props {
  id: string;
  informationRecords: Array<InformationType>;
  absence: MemberDetailedResponse['absence'];
}

const Information: React.FC<Props> = ({ id, informationRecords, absence }) => {
  const theme = useTheme();
  const [documentCount, setDocumentCount] = useState(0);

  return (
    <Grid container spacing={3} justifyContent="center">
      {absence.mandatePeriod.value !== null && (
        <Grid item xs={6} sm={4}>
          <Paper style={{ padding: '0.5rem' }}>
            <Typography variant="h5" component="p" align="center">
              {absence.mandatePeriod.value}%
            </Typography>
            <Typography variant="body2" align="center">
              Voteringsnärvaro mandatperiod {absence.mandatePeriod.description}
            </Typography>
          </Paper>
        </Grid>
      )}
      {absence.parliamentYear.value !== null && (
        <Grid item xs={6} sm={4}>
          <Paper style={{ padding: '0.5rem' }}>
            <Typography variant="h5" component="p" align="center">
              {absence.parliamentYear.value}%
            </Typography>
            <Typography variant="body2" align="center">
              Voteringsnärvaro riksmöte {absence.parliamentYear.description}
            </Typography>
          </Paper>
        </Grid>
      )}
      <Grid item xs={12} sm={4}>
        <Paper style={{ padding: '0.5rem' }}>
          <Typography variant="h5" component="p" align="center">
            {documentCount}
          </Typography>
          <Typography variant="body2" align="center">
            Dokument
          </Typography>
        </Paper>
      </Grid>
      {informationRecords.length > 0 && (
        <Grid item xs={12}>
          <Paper sx={{ p: 2, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
            <Typography
              variant="h4"
              component="span"
              color={theme.palette.mode === 'dark' ? 'textPrimary' : 'primary'}
            >
              Biografi
            </Typography>
          </Paper>

          {informationRecords.map((record) => (
            <Accordion key={`${record.type}:${record.code}`}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={record.code}>
                <Typography>{record.code}</Typography>
              </AccordionSummary>
              {record.content.map((information) => (
                <AccordionDetails key={information}>
                  {record.type === 'eadress' ? (
                    <Link href={information} target="_blank" rel="noopener noreferrer">
                      {information}
                    </Link>
                  ) : (
                    information
                  )}
                </AccordionDetails>
              ))}
            </Accordion>
          ))}
        </Grid>
      )}

      <Grid item xs={12}>
        <ResponsiveAd />
      </Grid>

      <Grid item xs={12}>
        <Documents id={id} setDocumentCount={setDocumentCount} />
      </Grid>
    </Grid>
  );
};

export default Information;
