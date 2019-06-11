const styles = ({ shadows }) => ({
  fullHeight: {
    display: 'flex',
    margin: 'auto',
    width: 'auto',
    height: '100%'
  },

  tile: {
    background: '#fff',
    borderRadius: '0.25rem',
    boxShadow: shadows[2]
  },

  tileTitle: {
    whiteSpace: 'normal'
  }
});

export default styles;
