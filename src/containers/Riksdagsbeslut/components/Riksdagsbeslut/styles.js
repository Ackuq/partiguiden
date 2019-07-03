const styles = theme => ({
  shown: {
    transform: 'rotate(180deg)'
  },
  paragraphContainer: {
    '& a': {
      color: '#212121'
    },
    '& .paragraph p': {
      fontSize: '1rem'
    }
  },
  title: {
    fontSize: '1.125rem',
    lineHeight: 1.3,
    color: theme.palette.primary.dark
  },
  subtitle: {
    fontSize: '1rem',
    lineHeight: 1.25
  },
  buttonContainer: {
    display: 'block',
    width: '100%'
  },
  arrow: {
    transition: 'transform 0.25s ease-in-out',
    fontSize: '2rem',
    color: theme.palette.primary.dark
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem '
  },
  headerTitle: {
    fontSize: '1.15rem',
    color: '#ffffff'
  },
  headerRoot: {
    width: '100%',
    textAlign: 'left',
    padding: '0.25rem 1rem'
  }
});

export default styles;
