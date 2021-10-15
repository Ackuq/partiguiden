import React, { useState, useEffect } from 'react';

import { Grid, Pagination } from '@mui/material';
import styled from '@emotion/styled';

import LoadCircle from '../../LoadCircle';
import Document from './Document';
import { useMemberDocuments } from '../../../hooks/parliamentHooks';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-bottom: 2rem;
`;

interface Props {
  id: string;
  setDocumentCount: React.Dispatch<React.SetStateAction<number>>;
}

const Documents: React.FC<Props> = ({ id, setDocumentCount }) => {
  const [page, setPage] = useState(1);

  const data = useMemberDocuments(id, page);

  useEffect(() => {
    if (data?.count) {
      setDocumentCount(data.count);
    }
  }, [data?.count, setDocumentCount]);

  const changePage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return !data ? (
    <Grid item xs={12}>
      <LoadCircle />
    </Grid>
  ) : (
    <>
      {data.documents.map((document) => (
        <Grid item xs={12} key={document.id}>
          <Document document={document} />
        </Grid>
      ))}
      {data.pages > 1 && (
        <PaginationContainer>
          <Pagination size="large" onChange={changePage} page={page} count={data.pages} />
        </PaginationContainer>
      )}
    </>
  );
};

export default Documents;
