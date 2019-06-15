import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  inputRoot: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '75%'
    },
    color: '#ffffff',
    float: 'right',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
    '-webkit-transition': '300ms ease-in-out',
    '-moz-transition': '300ms ease-in-out',
    '-ms-transition': '300ms ease-in-out',
    '-o-transition': '300ms ease-in-out',
    transition: '300ms ease-in-out',
    backgroundColor: '#00675b',
    borderRadius: '4px',
    padding: '0.25rem 0.5rem'
  },
  inputComp: {
    '&::placeholder': {
      opacity: '0.8'
    }
  },
  inputFocused: {
    width: '100%',
    backgroundColor: grey[50],
    '& input, & svg': {
      color: grey[800]
    }
  },
  menuItem: {
    width: '100%',
    color: '#212121',
    padding: '0.75rem 1rem'
  },
  container: {
    width: '100%',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      marginRight: '1rem'
    }
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    top: '56px',
    width: '100%'
  }
});

export default styles;
