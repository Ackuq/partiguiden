import React from 'react';
import Link from 'next/link';

import { Card, CardContent, CardHeader, Typography, ButtonBase } from '@mui/material';
import { darken } from '@mui/material/styles';

import styled from '@emotion/styled';

import { lookupAuthority } from '../../../utils/authorityTable';
import { MemberDocument } from '../../../types/member';

import * as ROUTES from '../../../lib/routes';

const CustomCardHeader = styled(CardHeader)<{ color: string }>`
  width: 100%;
  text-align: left;
  padding: 0.25rem 1rem;
  background-color: ${({ theme, color }) =>
    theme.palette.mode === 'dark' ? darken(color, 0.6) : color};
  .title {
    font-size: 1.15rem;
    color: #ffffff;
  }
`;

/* const useStyles = makeStyles({
  headerTitle: {
    fontSize: '1.15rem',
    color: '#ffffff',
  },
  headerRoot: {
    width: '100%',
    textAlign: 'left',
    padding: '0.25rem 1rem',
  },
}); */

interface Props {
  document: MemberDocument;
}
const Document: React.FC<Props> = ({ document }) => {
  const authority = !!document.authority && lookupAuthority(document.authority);
  return (
    <Card>
      <Link href={ROUTES.DOCUMENT} as={ROUTES.getDocumentHref(document.id)} passHref>
        <ButtonBase style={{ display: 'block' }} component="a">
          {authority && <CustomCardHeader title={authority.desc} color={authority.color} />}
          <CardContent>
            <Typography color="textSecondary" variant="body2">
              {document.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {document.altTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {document.subtitle}
            </Typography>
          </CardContent>
        </ButtonBase>
      </Link>
    </Card>
  );
};

export default Document;
