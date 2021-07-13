import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    listContainer: {
      marginBottom: '0.5rem',
      '& > div': {
        padding: '8px',
      },
    },
    shown: {
      transform: 'rotate(180deg)',
    },
    paragraphContainer: {
      '& .paragraph p': {
        fontSize: '1rem',
      },
    },
    title: {
      fontSize: '1.125rem',
      lineHeight: 1.3,
      color:
        theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.primary.dark,
    },
    subtitle: {
      fontSize: '1rem',
      lineHeight: 1.25,
    },
    buttonContainer: {
      display: 'block',
      width: '100%',
    },
    arrow: {
      transition: 'transform 0.25s ease-in-out',
      fontSize: '2rem',
      color:
        theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.primary.dark,
    },
    cardContainer: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      overflow: 'hidden',
      boxShadow: theme.shadows[1],
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.5rem 1rem ',
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
  });

export default makeStyles(styles);
