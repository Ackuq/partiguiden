import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    // Vote results
    vote: {
      display: 'flex',
      '& .box': {
        padding: '0.25rem',
      },
    },
    parties: {
      display: 'flex',
      justifyContent: 'center',
      '& > div': {
        margin: '2px',
      },
    },

    // Vote card
    title: {
      fontSize: '1.125rem',
      lineHeight: 1.3,
      color:
        theme.palette.type === 'dark' ? theme.palette.text.primary : theme.palette.primary.dark,
    },
    subtitle: {
      fontSize: '1rem',
      lineHeight: 1.25,
    },
    headerTitle: {
      fontSize: '1.15rem',
      color: '#ffffff',
    },
    headerRoot: {
      width: '100%',
      textAlign: 'left',
      padding: '0.25rem 1rem',
    },
    listContainer: {
      marginBottom: '0.5rem',
      '& > div': {
        padding: '8px',
      },
    },
  });

export default makeStyles(styles);
