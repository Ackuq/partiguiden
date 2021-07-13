import React from 'react';
import Link from 'next/link';

import { Card, CardContent, CardHeader, Typography, ButtonBase } from '@material-ui/core';
import { darken, useTheme, makeStyles } from '@material-ui/core/styles';

import { lookupAuthority } from '../../../utils/authorityTable';
import { MemberDocument } from '../../../types/member';

import * as ROUTES from '../../../lib/routes';

const useStyles = makeStyles({
  headerTitle: {
    fontSize: '1.15rem',
    color: '#ffffff',
  },
  headerRoot: {
    width: '100%',
    textAlign: 'left',
    padding: '0.25rem 1rem',
  },
});

interface Props {
  document: MemberDocument;
}
const Document: React.FC<Props> = ({ document }) => {
  const theme = useTheme();
  const classes = useStyles();
  const authority = !!document.authority && lookupAuthority(document.authority);
  return (
    <Card>
      <Link href={ROUTES.DOCUMENT} as={ROUTES.getDocumentHref(document.id)} passHref>
        <ButtonBase style={{ display: 'block' }} component="a">
          {authority && (
            <CardHeader
              title={authority.desc}
              style={{
                background:
                  theme.palette.mode === 'dark' ? darken(authority.color, 0.6) : authority.color,
              }}
              classes={{
                title: classes.headerTitle,
                root: classes.headerRoot,
              }}
            />
          )}
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
