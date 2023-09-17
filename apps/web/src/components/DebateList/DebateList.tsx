import React, { useCallback } from 'react';

import { NextRouter } from 'next/router';
import { stringify } from 'querystring';

import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { FlowAd } from '../Ad';
import LoadCircle from '../LoadCircle';

import { useDebates } from '../../hooks/parliamentHooks';
import Debate from './Debate';

interface Props {
  router: NextRouter;
  page: number;
}

const DebateListContainer: React.FC<Props> = ({ router, page }) => {
  const data = useDebates(router.query);

  const updatePage = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      const { query } = router;
      query.page = `${newPage}`;

      router.push(`${router.route}?${stringify(query)}`);
    },
    [router]
  );

  return (
    <>
      {!data ? (
        <LoadCircle />
      ) : data.debates.length > 0 ? (
        <>
          {data.debates.map((item, index) => (
            <React.Fragment key={item.id + item.denomination}>
              {!(index % 15) && <FlowAd />}
              <Debate debate={item} />
            </React.Fragment>
          ))}
          {data.pages > 1 && (
            <Pagination
              style={{ display: 'flex', justifyContent: 'center' }}
              size="large"
              onChange={updatePage}
              page={page}
              count={data.pages}
            />
          )}
        </>
      ) : (
        <Typography>Inga debatter hittades</Typography>
      )}
    </>
  );
};

export default DebateListContainer;
