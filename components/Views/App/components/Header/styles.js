const styles = theme => ({
  banner: {
    zIndex: '1200',
    backgroundColor: theme.palette.primary.main
  },
  brand: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    '& a': {
      fontSize: '2rem',
      paddingLeft: '0.25rem',
      paddingRight: '0.25rem',
      color: theme.palette.primary.contrastText
    }
  },
  aligner: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0.5rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
      flexBasis: '100%'
    }
  }
});

export default styles;
