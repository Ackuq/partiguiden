const styles = theme => ({
  memberCard: {
    display: 'flex',
    padding: '0.5rem 1rem',
    justifyContent: 'space-between',
    position: 'relative',
    cursor: 'pointer'
  },

  memberImage: {
    borderRadius: '10rem',
    width: '200px',
    height: '200px'
  },

  partySymbol: {
    width: '75px',
    height: '75px',
    position: 'absolute',
    right: 0,
    padding: '0.75rem',
    top: 0
  },

  memberInfo: {
    color: theme.palette.primary.dark,
    '& > div:first-child': {
      marginBottom: '1rem'
    },
    '& > div:last-child': {
      marginTop: '1rem'
    }
  },

  textContainer: {
    borderRadius: '0 0 4px 4px',
    padding: '0.5rem',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff'
  }
});

export default styles;
