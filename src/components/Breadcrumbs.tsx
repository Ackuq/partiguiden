import React from 'react';
import Link from 'next/link';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';

import HomeIcon from '@material-ui/icons/Home';

interface Props {
  links: Array<{ href: string; label: string }>;
}

const CustomBreadcrumbs: React.FC<Props> = ({ links }) => (
  <Breadcrumbs aria-label="Breadcrumb">
    <Link href="/">
      <Chip component="a" href="/" label="Hem" avatar={<HomeIcon />} />
    </Link>
    {links.map((link) => (
      <Link href={link.href} key={link.label}>
        <Chip component="a" href={link.href} label={link.label} />
      </Link>
    ))}
  </Breadcrumbs>
);

export default CustomBreadcrumbs;
