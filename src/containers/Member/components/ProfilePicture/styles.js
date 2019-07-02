const styles = ({ palette, shadows }) => ({
  profilePicture: {
    width: '192px',
    height: '192px',
    borderRadius: '10rem',
    position: 'relative'
  },

  pictureContainer: {
    position: 'relative',
    height: '142px',
    marginBottom: '100px',
    paddingTop: '50px',
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
  },

  breadcrumbs: {
    padding: '1rem',
    position: 'absolute',
    top: 0,
    left: 0
  }
});

export default styles;
