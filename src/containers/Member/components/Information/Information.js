import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { string, array, number } from 'prop-types';

import Documents from '../Documents';

const Information = ({ id, records, absence }) => {
  const [documentCount, setDocumentCount] = useState('0');

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
      {records.length > 0 && (
        <Grid item xs={12}>
          <Paper style={{ padding: '1rem', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
            <Typography variant="h4" color="primary">
              Biografi
            </Typography>
          </Paper>

          {records.map((record, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ExpansionPanel key={index}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls={record.kod}>
                <Typography>{record.kod}</Typography>
              </ExpansionPanelSummary>
              {record.uppgift.map(uppgift => (
                <ExpansionPanelDetails key={uppgift}>
                  {record.typ === 'eadress' ? (
                    <a href={uppgift} target="_blank" rel="noopener noreferrer">
                      {uppgift}
                    </a>
                  ) : (
                    uppgift
                  )}
                </ExpansionPanelDetails>
              ))}
            </ExpansionPanel>
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

Information.propTypes = {
  id: string.isRequired,
  records: array.isRequired,
  absence: number.isRequired,
};

export default Information;
