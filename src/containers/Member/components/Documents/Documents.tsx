import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

import makeStyles from '@material-ui/styles/makeStyles';

import { apiLinks } from '../../../../utils';
import LoadCircle from '../../../../components/LoadCircle';
import Document from './Document';
import fetchMemberDocuments from './fetchMemberDocuments';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  loadMore: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '1rem',
    height: '2rem',
    padding: '0 2rem',
  },
}));

interface Props {
  id: number;
  setDocumentCount: Function;
}

const Documents: React.FC<Props> = ({ id, setDocumentCount }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([] as Array<any>);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(true);

  const url = `${apiLinks.riksdagenApi}/dokumentlista/?avd=dokument&sort=datum&sortorder=datum&utformat=json&iid=${id}&p=${page}`;

  useEffect(() => {
    setLoading(true);
    fetchMemberDocuments({ url, page }).then(res => {
      setDocumentCount(res.count);
      if (res.count !== '0') setDocuments([...documents, ...res.documents]);
      setLastPage(res.lastPage);
      setLoading(false);
    });
  }, [page]);

  return (
    <>
      {documents.map(document => (
        <Grid item xs={12} key={document.id}>
          <Document document={document} />
        </Grid>
      ))}
      {loading ? (
        <Grid item xs={12}>
          <LoadCircle />
        </Grid>
      ) : (
        !lastPage && (
          <Grid item xs={12} className={classes.buttonContainer}>
            <ButtonBase
              className={classes.loadMore}
              onClick={() => {
                setLastPage(true);
                setPage(curr => curr + 1);
              }}
            >
              Ladda mer
            </ButtonBase>
          </Grid>
        )
      )}
    </>
  );
};

export default Documents;
