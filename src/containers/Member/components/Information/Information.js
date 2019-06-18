import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Paper,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { string, array } from 'prop-types';

import Documents from '../Documents';
import { getVoteAbsence } from '../../lib';

const notAcceptedCodes = [
  'sv',
  'en',
  'KandiderarINastaVal',
  'Officiell e-postadress',
  'Föräldrar',
  'Tjänstetelefon'
];

const Information = ({ id, records }) => {
  const [absence, setAbsence] = useState('');
  const [documentCount, setDocumentCount] = useState('0');

  const url = `https://data.riksdagen.se/voteringlista/?iid=${id}&utformat=JSON&gruppering=namn`;

  useEffect(() => {
    getVoteAbsence({ url }).then(res => setAbsence(res.absence));
  }, []);

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

          {records.map((record, index) => {
            if (!notAcceptedCodes.includes(record.kod))
              return (
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
              );
            return null;
          })}
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
  records: array.isRequired
};

export default Information;
