import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const StandpointObject = ({ subject, classes }) => (
  <Link href="/standpunkter/[id]" as={`/standpunkter/${subject.id}`}>
    <a className={classes.button} href={`/standpunkter/${subject.id}`}>
      <span className={classes.transition}>{subject.name}</span>
    </a>
  </Link>
);

StandpointObject.propTypes = {
  subject: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default StandpointObject;
