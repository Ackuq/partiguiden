const styles = ({ palette }) => ({
  dokumentBody: {
    marginTop: '1rem',
    '& table': {
      display: 'block',
      maxWidth: '100%',
    },
    '& h1': {
      color: palette.primary.light,
      fontSize: '1.75rem',
    },
    '& a': {
      color: palette.primary.main,
    },
  },
});

export default styles;
