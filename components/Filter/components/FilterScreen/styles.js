import grey from '@material-ui/core/colors/grey';

const filterScreenStyles = () => ({
  filterScreenContainer: {
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    overflowY: 'auto',
    maxHeight: '-webkit-fill-available',
    position: 'fixed',
    minHeight: '100%',
    minWidth: '50%',
    top: 0,
    right: '-100%',
    background: grey[100],
    transition: 'all 0.3s ease-in-out',
    boxShadow:
      '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
  },
  showFilterScreen: {
    right: 0
  }
});

export default filterScreenStyles;
