const styles = ({ palette, shadows }) => ({
  profilePicture: {
    width: '192px',
    height: '192px',
    borderRadius: '10rem',
    position: 'relative'
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
    textAlign: 'center',
    paddingTop: '1rem',
    paddingBottom: '1rem'
  },

  partySymbol: {
    width: '75px',
    height: '75px',
    position: 'absolute',
    right: 0,
    top: 0
  }
});

export default styles;
