import React from 'react';

import NextLink from 'next/link';

import { Avatar, Divider, Grid, Link, Paper, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import * as ROUTES from '../lib/routes';

import { Leader as LeaderType } from '../types/member';
import { PartyData } from '../types/party';

const Biography = styled.div`
  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`;

const LeaderAvatar = styled(Avatar)(
  ({ theme }) => `
    margin-bottom: ${theme.spacing(1)};
    margin-right: auto;
    margin-left: auto;
    width: ${theme.spacing(20)};
    height: ${theme.spacing(20)};

    ${theme.breakpoints.down('md')} {
      width: ${theme.spacing(15)};
      height: ${theme.spacing(15)};
    }

    ${theme.breakpoints.down('xs')} {
      width: ${theme.spacing(10)};
      height: ${theme.spacing(10)};
    }
`
);

const LeaderCard = styled(Paper)(
  ({ theme }) => `
    height: 100%;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-shadow: ${theme.shadows[2]};
    :hover {
      background-color:
        ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]};
      box-shadow: ${theme.shadows[10]};
    }
`
);

const InformationDivider = styled(Divider)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

interface Props {
  party: PartyData;
}

const Party: React.FC<Props> = ({ party }) => {
  const theme = useTheme();

  const InformationCard: React.FC = () => (
    <Paper
      sx={{
        padding: '1rem',
        marginBottom: theme.spacing(4),
      }}
    >
      <div>
        <Typography variant="h5">Hemsida</Typography>
        <Typography>
          <Link href={party.website} rel="noopener" target="_blank">
            {party.website}
          </Link>
        </Typography>
      </div>
      <InformationDivider />
      <div>
        <Typography variant="h5">Ideologi</Typography>
        <Typography>{party.ideology.join(', ')}</Typography>
        <Typography component="p" variant="caption">
          Källa:{' '}
          <Link href="https://www.wikipedia.org/" rel="noopener" target="_blank">
            https://www.wikipedia.org/
          </Link>
        </Typography>
      </div>
      <InformationDivider />
      <div>
        <Typography variant="h5">Biografi</Typography>
        <Typography component="div" variant="body2">
          <Biography dangerouslySetInnerHTML={{ __html: party.abstract }} />
        </Typography>
        <Typography component="p" variant="caption">
          Källa:{' '}
          <Link href="https://www.wikipedia.org/" rel="noopener" target="_blank">
            https://www.wikipedia.org/
          </Link>
        </Typography>
      </div>
    </Paper>
  );

  const Leader: React.FC<LeaderType> = ({ id, role, firstName, lastName, pictureUrl }) => {
    return (
      <Grid item md={3} sm={4} xs={6}>
        <NextLink passHref href={ROUTES.MEMBER} as={ROUTES.getMemberHref(id)}>
          <a
            css={css`
              text-decoration: none;
            `}
          >
            <LeaderCard elevation={0}>
              <LeaderAvatar src={pictureUrl} alt={`${firstName} ${lastName}`} />
              <div>
                <Typography variant="subtitle2" component="p">
                  {firstName} {lastName}
                </Typography>
                <Typography>{role}</Typography>
              </div>
            </LeaderCard>
          </a>
        </NextLink>
      </Grid>
    );
  };

  const Leaders: React.FC = () => (
    <Paper sx={{ padding: '1rem' }}>
      <Typography gutterBottom variant="h4" align="center">
        Ledning
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {party.leaders.map((leader) => (
          <Leader key={leader.sourceId} {...leader} />
        ))}
      </Grid>
    </Paper>
  );

  return (
    <>
      <InformationCard />
      <Leaders />
    </>
  );
};

export default Party;
