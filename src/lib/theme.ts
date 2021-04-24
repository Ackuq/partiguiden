import { responsiveFontSizes } from '@material-ui/core';
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';

const getTheme = (darkMode: boolean): Theme =>
  responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: darkMode ? 'dark' : 'light',
        primary: {
          main: '#00796b',
        },
        secondary: {
          main: '#80cbc4',
        },
        background: {
          paper: darkMode ? '#242526' : '#fff',
          default: darkMode ? '#18191A' : '#fafafa',
        },
      },
      overrides: {
        MuiTypography: {
          button: {
            textDecoration: 'none',
          },
          h1: {
            fontSize: '2.5rem',
          },
          h2: {
            fontSize: '2rem',
          },
          h3: {
            fontSize: '1.75rem',
          },
          h4: {
            fontSize: '1.5rem',
            fontWeight: 'lighter',
          },
          h5: {
            fontSize: '1.25rem',
          },
          h6: {
            fontSize: '1rem',
          },
        },
        MuiButtonBase: {
          root: {
            fontSize: '1rem',
            fontFamily: 'inherit',
            '-webkit-transition': 'background-color 0.4s ease-in-out',
            '-moz-transition': 'background-color 0.4s ease-in-out',
            '-ms-transition': 'background-color 0.4s ease-in-out',
            '-o-transition': 'background-color 0.4s ease-in-out',
            transition: 'background-color 0.4s ease-in-out',
          },
        },
      },
    })
  );

export default getTheme;
