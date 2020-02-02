import React from 'react';
import Link from 'next/link';

interface Props {
  subject: any;
  classes: any;
}

const StandpointObject: React.FC<Props> = ({ subject, classes }) => (
  <Link href="/standpunkter/[id]" as={`/standpunkter/${subject.id}`}>
    <a className={classes.button} href={`/standpunkter/${subject.id}`}>
      <span className={classes.transition}>{subject.name}</span>
    </a>
  </Link>
);

export default StandpointObject;
