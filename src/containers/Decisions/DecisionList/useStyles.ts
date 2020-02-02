import { makeStyles, createStyles } from '@material-ui/styles';

const styles = theme =>
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
      '& a': {
        color: '#212121',
      },
      '& .paragraph p': {
        fontSize: '1rem',
      },
    },
    title: {
      fontSize: '1.125rem',
      lineHeight: 1.3,
      color: theme.palette.primary.dark,
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
      color: theme.palette.primary.dark,
    },
    cardContainer: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#fff',
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
