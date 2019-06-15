const styles = theme => ({
  titel: {
    marginBottom: '2rem',
    transition: 'color 0.3s ease-in-out',
    '-webkit-transition': 'color 0.4s ease-in-out',
    '-moz-transition': 'color 0.3s ease-in-out',
    '-ms-transition': 'color 0.3s ease-in-out',
    '-o-transition': 'color 0.3s ease-in-out',
    '&:hover': {
      color: '#34495e'
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
