import React, { useState, useEffect } from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import useTheme from '@mui/system/useTheme';

import { styled } from '@mui/material/styles';

import LoadCircle from '../../LoadCircle';
import Document from './Document';
import { useMemberDocuments } from '../../../hooks/parliamentHooks';

const PaginationContainer = styled('div')`
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
  const theme = useTheme();
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

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={3}>
        <Typography
          variant="h4"
          component="span"
          color={theme.palette.mode === 'dark' ? 'textPrimary' : 'primary'}
        >
          Dokument
        </Typography>

        {!data ? (
          <div style={{ alignItems: 'center' }}>
            <LoadCircle />
          </div>
        ) : (
          <>
            {data.documents.map((document) => (
              <Document document={document} key={document.id} />
            ))}
            {data.pages > 1 && (
              <PaginationContainer>
                <Pagination onChange={changePage} page={page} count={data.pages} />
              </PaginationContainer>
            )}
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default Documents;
