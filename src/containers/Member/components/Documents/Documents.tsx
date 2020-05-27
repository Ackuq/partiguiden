import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core';

import LoadCircle from '../../../../components/LoadCircle';
import Document from './Document';
import { getMemberDocuments } from '../../../../lib/parlimentApi';

const useStyles = makeStyles((theme: Theme) => ({
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

  useEffect(() => {
    setLoading(true);
    getMemberDocuments(id, page).then((data: any) => {
      const { dokumentlista } = data;
      const pages = parseInt(dokumentlista['@sidor'], 10);

      const count = dokumentlista['@traffar'];
      setDocumentCount(count);
      if (count !== '0') {
        setDocuments([...documents, ...dokumentlista.dokument]);
      }
      setLastPage(page === pages || pages === 0);
      setLoading(false);
    });
  }, [page]);

  return (
    <>
      {documents.map((document) => (
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
                setPage((curr) => curr + 1);
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
