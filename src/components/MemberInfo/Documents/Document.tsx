import Link from 'next/link';

import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { MemberDocument } from '../../../types/member';
import { lookupAuthority } from '../../../utils/authorityTable';

import * as ROUTES from '../../../lib/routes';
import AuthorityCardHeader from '../../AuthorityCardHeader';

interface Props {
  document: MemberDocument;
}
const Document: React.FC<Props> = ({ document }) => {
  const authority = !!document.authority && lookupAuthority(document.authority);
  return (
    <Card elevation={4}>
      <Link href={ROUTES.DOCUMENT} as={ROUTES.getDocumentHref(document.id)} passHref>
        <ButtonBase style={{ display: 'block' }} component="a">
          {authority && <AuthorityCardHeader authority={authority} />}
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
