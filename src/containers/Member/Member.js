import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid, ButtonBase } from '@material-ui/core';

import { ProfilePicture, Information, Document } from './components';
import { getMemberDocuments } from './lib';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
    marginBottom: '1rem'
  },
  loadMore: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '1rem',
    height: '2rem',
    padding: '0 2rem'
  }
}));

const Member = ({ member }) => {
  const classes = useStyles();
  const [documentCount, setDocumentCount] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [lastPage, setLastPage] = useState(true);
  const [page, setPage] = useState(1);

  const url = `https://data.riksdagen.se/dokumentlista/?avd=dokument&sort=datum&sortorder=datum&utformat=json&iid=${
    member.intressent_id
  }&p=${page}`;

  useEffect(() => {
    getMemberDocuments({ url, page }).then(res => {
      if (!documentCount) setDocumentCount(res.count);
      setDocuments([...documents, ...res.documents]);
      setLastPage(res.lastPage);
    });
  }, [page]);

  return (
    <React.Fragment>
      <ProfilePicture
        src={member.bild_url_192}
        name={`${member.tilltalsnamn} ${member.efternamn}`}
        status={member.status}
        age={new Date().getFullYear() - member.fodd_ar}
      />
      <Container>
        <Information id={member.intressent_id} documentCount={documentCount} />
        <Grid container spacing={3}>
          {documents.map(document => (
            <Grid item xs={12} key={document.id}>
              <Document document={document} />
            </Grid>
          ))}
        </Grid>
        {!lastPage && (
          <div className={classes.buttonContainer}>
            <ButtonBase
              className={classes.loadMore}
              onClick={() => {
                setLastPage(true);
                setPage(curr => curr + 1);
              }}
            >
              Ladda mer
            </ButtonBase>
          </div>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Member;
