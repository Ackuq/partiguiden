import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  [theme.breakpoints.down('sm')]: {
    filterContainer: {
      position: 'fixed',
      bottom: '1rem',
      right: '5%',
      borderRadius: '2rem'
    },
    buttonContainer: {
      minWidth: '0',
      height: '4rem',
      width: '4rem',
      borderRadius: '2rem',
      background: grey[100],
      '&:hover': {
        background: grey[200]
      }
    },
    icon: {
      fontSize: '3rem'
    },
    filterOverlay: {
      transition: 'background 0.2s ease-in-out'
    },
    filterOverlayShow: {
      zIndex: 9999,
      top: 0,
      left: 0,
      position: 'fixed',
      height: '100%',
      width: '100%',
      background: 'rgba(0, 0, 0, 0.5)'
    }
  },
  [theme.breakpoints.up('md')]: {
    filterContainer: {
      display: 'none'
    },
    filterOverlay: {
      minWidth: '25%',
      marginLeft: '1rem',
      marginBottom: '1rem'
    }
  }
});

export default styles;
