import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Documents from './Documents';
import { Information as InformationType } from '../../types/member';

interface Props {
  id: string;
  informationRecords: Array<InformationType>;
  absence: number;
}

const Information: React.FC<Props> = ({ id, informationRecords, absence }) => {
  const [documentCount, setDocumentCount] = useState(0);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Paper style={{ padding: '0.5rem' }}>
          <Typography variant="h5" align="center">
            {absence} %
          </Typography>
          <Typography variant="body2" align="center">
            Voteringsnärvaro
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper style={{ padding: '0.5rem' }}>
          <Typography variant="h5" align="center">
            {documentCount}
          </Typography>
          <Typography variant="body2" align="center">
            Dokument
          </Typography>
        </Paper>
      </Grid>
      {informationRecords.length > 0 && (
        <Grid item xs={12}>
          <Paper style={{ padding: '1rem', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
            <Typography variant="h4" color="primary">
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
                    <a href={information} target="_blank" rel="noopener noreferrer">
                      {information}
                    </a>
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
        <Paper style={{ padding: '1rem' }}>
          <Typography variant="h4" color="primary">
            Dokument
          </Typography>
        </Paper>
      </Grid>
      <Documents id={id} setDocumentCount={setDocumentCount} />
    </Grid>
  );
};

export default Information;
