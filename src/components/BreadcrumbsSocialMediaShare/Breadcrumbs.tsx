import Link from 'next/link';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';

import HomeIcon from '@mui/icons-material/Home';

import { INDEX } from '../../lib/routes';
import { styled } from '@mui/material/styles';

const BreadcrumbsWithMargin = styled(Breadcrumbs)(
  ({ theme }) => `
    li {
      margin-bottom: ${theme.spacing(1)};
    }
`
);

interface Props {
  links: Array<{ href: string; as?: string; label: string }>;
}

const CustomBreadcrumbs: React.FC<Props> = ({ links }) => {
  return (
    <BreadcrumbsWithMargin
      aria-label="Breadcrumbs"

      /* classes={{
        li: classes.chip,
        separator: classes.chip,
      }} */
    >
      <Link href={INDEX} passHref>
        <Chip component="a" label="Hem" variant="outlined" icon={<HomeIcon fontSize="small" />} />
      </Link>
      {links.map((link) => (
        <Link href={link.href} as={link.as} key={link.label} passHref>
          <Chip component="a" label={link.label} variant="outlined" />
        </Link>
      ))}
    </BreadcrumbsWithMargin>
  );
};

export type BreadcrumbsProps = Props;

export default CustomBreadcrumbs;
