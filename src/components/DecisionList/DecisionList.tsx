import React, { useCallback } from 'react';

import { NextRouter } from 'next/router';
import { stringify } from 'querystring';

import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import { FlowAd } from '../Ad';
import Decision from './Decision';
import LoadCircle from '../LoadCircle';

import { useDecisions } from '../../hooks/parliamentHooks';

const ListContainer = styled('div')`
  margin-bottom: 0.5rem;
  > div {
    padding: 8px;
  }
`;

interface Props {
  router: NextRouter;
  page: number;
}

const DecisionListContainer: React.FC<Props> = ({ router, page }) => {
  const data = useDecisions(router.query);

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
      <ListContainer>
        {!data ? (
          <LoadCircle />
        ) : (
          <>
            {data.decisions.length > 0 ? (
              <>
                {data.decisions.map((item, index) => (
                  <React.Fragment key={item.id + item.denomination}>
                    {!(index % 15) && <FlowAd />}
                    <div>
                      <Decision decision={item} />
                    </div>
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
              <Typography>Inga riksdagsbeslut hittades</Typography>
            )}
          </>
        )}
      </ListContainer>
    </>
  );
};

export default DecisionListContainer;
