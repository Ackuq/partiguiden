import grey from '@material-ui/core/colors/grey';

const styles = () => ({
  partyStandpoint: {
    marginBottom: '2rem',
    '& h3': {
      marginBottom: '0.5rem',
      marginTop: '0.5rem'
    },
    '& li': {
      fontSize: '1.125rem',
      listStyle: 'none',
      position: 'relative'
    },
    '& li + li': {
      marginTop: '0.75rem'
    },
    '& ul': {
      paddingLeft: '1rem'
    }
  },
  partyTitle: {
    width: '100%',
    borderRadius: '3rem',
    textAlign: 'center',
    padding: '0.5rem 0',
    backgroundColor: grey[100],
    '&:hover': {
      backgroundColor: grey[200]
    }
  },
  collapse: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem'
  }
});

export default styles;
