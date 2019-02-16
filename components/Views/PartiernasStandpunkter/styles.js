const styles = theme => ({
  subjectList: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '-1rem',
    marginBottom: '1rem',
    [theme.breakpoints.up('md')]: {
      maxWidth: '90%'
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '70%'
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: '60%'
    }
  }
});

export default styles;
