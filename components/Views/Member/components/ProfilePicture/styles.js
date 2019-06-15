const styles = ({ palette, shadows }) => ({
  profilePicture: {
    width: '192px',
    height: '192px',
    borderRadius: '10rem'
  },

  pictureContainer: {
    height: '117px',
    marginBottom: '100px',
    paddingTop: '25px',
    background: palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    boxShadow: shadows[2]
  },

  nameContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '1rem',
    paddingBottom: '1rem'
  }
});

export default styles;
