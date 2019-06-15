const styles = ({ palette }) => ({
  dokumentBody: {
    marginTop: '1rem',
    '& h1': {
      color: palette.primary.light,
      fontSize: '1.75rem'
    },
    '& a': {
      color: palette.primary.main
    }
  }
});

export default styles;
