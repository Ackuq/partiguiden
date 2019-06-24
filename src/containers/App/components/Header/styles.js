const styles = theme => ({
  banner: {
    zIndex: '1200',
    backgroundColor: theme.palette.primary.main
  },
  brand: {
    margin: '0.25rem',
    textAlign: 'center',
    '& a': {
      textDecoration: 'none',
      fontSize: '2rem',
      paddingLeft: '0.25rem',
      paddingRight: '0.25rem',
      color: theme.palette.primary.contrastText
    }
  }
});

export default styles;
