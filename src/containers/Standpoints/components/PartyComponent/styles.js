const styles = theme => ({
  partyTitle: {
    justifyContent: 'space-between',
    width: '100%',
    padding: '0.5rem',
  },

  collapse: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },

  arrow: {
    transition: 'transform 0.25s ease-in-out',
    fontSize: '2rem',
    color: theme.palette.primary.dark,
  },

  shown: {
    transform: 'rotate(180deg)',
  },

  partyContainer: {
    marginBottom: '1.5rem',
  },
});

export default styles;
