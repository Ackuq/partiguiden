import grey from '@material-ui/core/colors/grey';

const styles = () => ({
  filterContainer: {
    position: 'fixed',
    bottom: '1rem',
    left: '1rem',
    borderRadius: '2rem'
  },
  icon: {
    fontSize: '3rem'
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
  }
});

export default styles;
