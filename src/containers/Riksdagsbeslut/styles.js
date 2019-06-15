const styles = theme => ({
  [theme.breakpoints.up('sm')]: {
    beslutListContainer: {
      display: 'flex'
    }
  },
  beslutPageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }
});

export default styles;
