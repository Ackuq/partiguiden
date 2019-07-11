const styles = theme => ({
  root: {
    padding: '1.5rem 0',
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    boxShadow: '0 -1px 3px rgba(34, 25, 25, 0.4)',
    '& a': {
      color: 'inherit',
      '-webkit-transition': 'color 0.2s ease-in-out',
      '-moz-transition': 'color 0.2s ease-in-out',
      '-ms-transition': 'color 0.2s ease-in-out',
      '-o-transition': 'color 0.2s ease-in-out',
      transition: 'color 0.2s ease-in-out',
      '&:hover': {
        color: theme.palette.secondary.contrastText,
      },
    },
  },
});

export default styles;
