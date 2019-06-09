const styles = theme => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
    marginBottom: '1rem'
  },
  loadMore: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '1rem',
    height: '2rem',
    padding: '0 2rem'
  },
  listContainer: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem'
  },
  [theme.breakpoints.up('sm')]: {
    VoteringListContainer: {
      display: 'flex'
    }
  },
  voteringarPageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }
});
export default styles;
