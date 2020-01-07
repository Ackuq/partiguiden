import React from 'react';

import useStyles from './useStyles';

const Document: React.FC<{ body: string }> = ({ body }) => {
  const classes = useStyles();

  return <div className={classes.dokumentBody} dangerouslySetInnerHTML={{ __html: body }} />; // eslint-disable-line react/no-danger
};

export default Document;
