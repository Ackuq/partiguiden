import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  [theme.breakpoints.down('sm')]: {
    filterScreenContainer: {
      position: 'fixed',
      zIndex: 9999,
      padding: '0 1rem',
      height: '100%',
      minWidth: '50%',
      maxWidth: '75%',
      top: 0,
      right: '-100%',
      transition: 'all 0.3s ease-in-out',
      boxShadow:
        '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
    },
    showFilterScreen: {
      right: 0
    },
    filterButtonContainer: {
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
    filterButtonContainer: {
      display: 'none'
    },
    filterOverlay: {
      minWidth: '25%',
      marginLeft: '1rem',
      marginBottom: '1rem'
    },
    filterScreenContainer: {
      maxWidth: '100%',
      position: 'sticky',
      top: '55px',
      maxHeight: 'calc(100vh - 100px)',
      borderRadius: '4px',
      boxShadow:
        '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
    }
  },
  filterScreenContainer: {
    display: 'flex',
    flexDirection: 'column',
    background: grey[100],
    overflowY: 'auto',
    overflowX: 'hidden'
  }
});

export default styles;
