import makeStyles from '@material-ui/styles/makeStyles';
import { Theme } from '@material-ui/core';

const styles = ({ palette }: Theme) => ({
  dokumentBody: {
    marginTop: '1rem',
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
});

export default makeStyles(styles);
