import grey from '@material-ui/core/colors/grey';

const filterScreenStyles = theme => ({
  filterScreenContainer: {
    display: 'flex',
    flexDirection: 'column',
    background: grey[100],
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  [theme.breakpoints.down('sm')]: {
    filterScreenContainer: {
      position: 'fixed',
      zIndex: 9999,
      maxHeight: '100%',
      padding: '0 1rem',
      minHeight: '100%',
      minWidth: '50%',
      top: 0,
      right: '-100%',
      transition: 'all 0.3s ease-in-out',
      boxShadow:
        '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
    },
    showFilterScreen: {
      right: 0
    }
  },

  [theme.breakpoints.up('md')]: {
    filterScreenContainer: {
      maxWidth: '100%',
      position: 'sticky',
      top: '55px',
      maxHeight: 'calc(100vh - 100px)',
      borderRadius: '4px',
      boxShadow:
        '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
    }
  }
});

export default filterScreenStyles;
