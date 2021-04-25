import React from 'react';

import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles(({ palette }: Theme) => {
  const styles = {
    dokumentBody: {
      marginTop: '1rem',
      '& *': {},
      '& table': {
        display: 'block',
        maxWidth: '100%',
      },
      '& h1': {
        color: palette.primary.light,
        fontSize: '1.75rem',
      },
      '& a': {
        color: palette.primary.main,
      },
    },
  };

  if (palette.type === 'dark') {
    styles.dokumentBody['& *'] = {
      color: '#fff !important',
      borderColor: '#fff !important',
    };
  }

  return styles;
});

const Document: React.FC<{ body: string }> = ({ body }) => {
  const classes = useStyles();

  return <div className={classes.dokumentBody} dangerouslySetInnerHTML={{ __html: body }} />;
};

export default Document;
