import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

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
  const classes = useStyles();
  const authority = !!document.authority && lookupAuthority(document.authority);
  return (
    <Card>
      <Link href={ROUTES.DOCUMENT} as={ROUTES.getDocumentHref(document.id)} passHref>
        <ButtonBase style={{ display: 'block' }} component="a">
          {authority && (
            <CardHeader
              title={authority.desc}
              style={{ background: authority.color }}
              classes={{
                title: classes.headerTitle,
                root: classes.headerRoot,
              }}
            />
          )}
          <CardContent>
            <Typography style={{ fontSize: '0.75rem' }} color="textSecondary" gutterBottom>
              {document.title}
            </Typography>
            <Typography color="primary">{document.altTitle}</Typography>
            <Typography style={{ fontSize: '0.85rem' }} color="textSecondary">
              {document.subtitle}
            </Typography>
          </CardContent>
        </ButtonBase>
      </Link>
    </Card>
  );
};

export default Document;
