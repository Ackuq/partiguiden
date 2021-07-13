import React, { useState } from 'react';
import Link from 'next/link';

import { Grid, Theme } from '@material-ui/core';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { SubjectList } from '../types/subjects';

import * as ROUTES from '../lib/routes';
import Search from '../components/Search/Search';

const containerStyles = (theme: Theme) => css`
  margin-left: auto;
  margin-right: auto;
  ${theme.breakpoints.up('md')} {
    max-width: 90%;
  }
  ,
  ${theme.breakpoints.up('lg')} {
    max-width: 70%;
  }
  ,
  ${theme.breakpoints.up('xl')} {
    max-width: 60%;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  margin-top: -1rem;
`;

const Transition = styled.span`
  margin: 0;
  background: linear-gradient(
    to left,
    transparent 50%,
    ${({ theme }) =>
        theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main}
      50%
  );
  background-size: 202% 100%;
  background-position: right bottom;
  background-repeat: no-repeat;
  color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.primary.contrastText : theme.palette.grey[900]};
  line-height: 50px;
  padding: 0 0.5rem;
  transition: all 0.2s ease-in-out;
`;

const Button = styled.a`
  text-decoration: none;
  display: flex;
  flex: 1;
  font-size: 1rem;
  justify-content: flex-start;
  :hover span {
    background-position: left bottom;
    color: ${({ theme }) => theme.palette.grey[100]};
  }
`;

const Item = styled(Grid)`
  ${({ theme }) => `
    ${theme.breakpoints.down('sm')} {
      border-left: solid 2px ${
        theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main
      };
    }
    ${theme.breakpoints.up('md')} {
      :nth-child(2n + 1) {
        border-left: solid 2px ${
          theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main
        };
      }
      :nth-child(2n) {
        border-right: solid 2px ${
          theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main
        };
      }
    }
    :nth-child(3n) {
      background-color:
        ${theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[50]};
    }
    :nth-child(3n + 1) {
      background-color:
        ${theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[100]};
    }
    :nth-child(3n + 2) {
      background-color:
        ${theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[200]};
    }
  `}
`;

interface Props {
  subjects: SubjectList;
}

const Subjects: React.FC<Props> = ({ subjects }) => {
  const [shownSubjects, setShownSubjects] = useState(subjects);

  return (
    <>
      <SearchContainer css={containerStyles}>
        <Search setSearchResult={setShownSubjects} />
      </SearchContainer>
      <Grid
        container
        css={containerStyles}
        sx={{
          marginBottom: '1rem',
        }}
      >
        {shownSubjects.map((subject) => (
          <Item item xs={12} md={6} key={subject.id}>
            <Link href={ROUTES.STANDPOINT} as={ROUTES.getStandpointHref(subject.id)} passHref>
              <Button>
                <Transition>{subject.name}</Transition>
              </Button>
            </Link>
          </Item>
        ))}
      </Grid>
    </>
  );
};

export default Subjects;
