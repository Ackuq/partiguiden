import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  button: {
    textAlign: 'center',
    width: '100%',
    '& a': {
      fontWeight: '400',
      display: 'flex',
      flexGrow: '1',
      color: grey[900],
      '& span': {
        lineHeight: '50px',
        padding: '0 0.5rem',
        '-webkit-transition': 'all 0.2s ease-in-out',
        '-moz-transition': 'all 0.2s ease-in-out',
        '-ms-transition': 'all 0.2s ease-in-out',
        '-o-transition': 'all 0.2s ease-in-out',
        transition: 'all 0.2s ease-in-out',
        background: 'linear-gradient( to left, transparent 50%, #00796b 50% )',
        backgroundSize: '202% 100%',
        backgroundPosition: 'right bottom',
        backgroundRepeat: 'no-repeat'
      },
      '&:hover span': {
        backgroundPosition: 'left bottom',
        color: grey[100]
      }
    }
  },

  item: {
    [theme.breakpoints.down('sm')]: {
      borderColor: theme.palette.primary.main,
      borderLeft: 'solid 2px'
    },
    [theme.breakpoints.up('md')]: {
      '&:nth-child(2n + 1)': {
        borderColor: theme.palette.primary.main,
        borderLeft: 'solid 2px'
      },
      '&:nth-child(2n)': {
        borderRight: 'solid 2px',
        borderColor: theme.palette.primary.main
      }
    },
    '&:nth-child(3n) a': {
      backgroundColor: grey[50]
    },
    '&:nth-child(3n + 1) a': {
      backgroundColor: grey[100]
    },
    '&:nth-child(3n + 2) a': {
      backgroundColor: grey[200]
    }
  }
});

export default styles;
