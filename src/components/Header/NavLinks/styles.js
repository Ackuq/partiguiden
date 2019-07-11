const styles = theme => ({
  [theme.breakpoints.up('sm')]: {
    navTab: {
      flexGrow: 1,
      transition: 'opacity 0.3s ease-in-out',
      '-webkit-transition': 'opacity 0.4s ease-in-out',
      '-moz-transition': 'opacity 0.3s ease-in-out',
      '-ms-transition': 'opacity 0.3s ease-in-out',
      '-o-transition': 'opacity 0.3s ease-in-out',
      '&:hover': {
        opacity: 1,
      },
    },
    scrollButton: {
      display: 'none',
    },
    scrollTab: {
      overflow: 'hidden',
    },
  },
});

export default styles;
