import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const styles = ({ shadows, shape, palette }: Theme) =>
  createStyles({
    memberCard: {
      boxShadow: shadows[1],
      borderRadius: shape.borderRadius,
      backgroundColor: palette.background.paper,
      position: 'relative',
      display: 'flex',
      padding: '0.5rem 1rem 1.5rem 0.5rem',
      justifyContent: 'space-between',
      textAlign: 'left',
      flex: 1,
      textDecoration: 'none',
    },

    partyLogo: {
      position: 'absolute',
      right: 0,
      top: 0,
      padding: '0.5rem',
    },

    image: {
      width: 175,
      height: 175,
      borderRadius: '50%',
    },

    nameContainer: {
      padding: '0.5rem',
      position: 'absolute',
      width: '100%',
      bottom: 0,
      left: 0,
      borderRadius: '0 0 4px 4px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: '#fff',
    },

    infoContainer: {
      color: palette.type === 'dark' ? palette.text.primary : palette.primary.main,
      display: 'flex',
      flexDirection: 'column',
    },

    role: {
      fontSize: '1rem',
      marginBottom: '0.25rem',
    },

    infoTitle: {
      fontWeight: 500,
      marginTop: '0.25rem',
      marginBottom: '0.125rem',
    },
  });

export default makeStyles(styles);
