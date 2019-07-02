const styles = theme => ({
  partyStandpoint: {
    marginBottom: '2rem',
    '& h3': {
      marginBottom: '0.25rem',
      marginTop: '0.25rem'
    }
  },

  partyTitle: {
    justifyContent: 'space-between',
    width: '100%',
    padding: '0.5rem'
  },

  collapse: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem'
  },

  arrow: {
    transition: 'transform 0.25s ease-in-out',
    fontSize: '2rem',
    color: theme.palette.primary.dark
  },

  shown: {
    transform: 'rotate(180deg)'
  }
});

export default styles;
