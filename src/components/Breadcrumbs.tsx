import React from 'react';
import Link from 'next/link';

import { Breadcrumbs, Chip } from '@material-ui/core';

import { Home as HomeIcon } from '@material-ui/icons';
import { INDEX } from '../lib/routes';

interface Props {
  links: Array<{ href: string; as?: string; label: string }>;
}

const CustomBreadcrumbs: React.FC<Props> = ({ links }) => (
  <Breadcrumbs aria-label="Breadcrumb">
    <Link href={INDEX} passHref>
      <Chip component="a" label="Hem" avatar={<HomeIcon />} />
    </Link>
    {links.map((link) => (
      <Link href={link.href} as={link.as} key={link.label} passHref>
        <Chip component="a" label={link.label} />
      </Link>
    ))}
  </Breadcrumbs>
);

export default CustomBreadcrumbs;
