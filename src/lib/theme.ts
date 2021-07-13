import { createTheme, responsiveFontSizes, Theme } from '@material-ui/core/styles';

const getTheme = (darkMode: boolean): Theme =>
  responsiveFontSizes(
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
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
      typography: {
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
      components: {
        MuiButtonBase: {
          styleOverrides: {
            root: {
              fontSize: '1rem',
              fontFamily: 'inherit',
              WebkitTransition: 'background-color 0.4s ease-in-out',
              MozTransition: 'background-color 0.4s ease-in-out',
              msTransition: 'background-color 0.4s ease-in-out',
              transition: 'background-color 0.4s ease-in-out',
            },
          },
        },
        MuiTab: {
          styleOverrides: {
            textColorInherit: {
              opacity: 0.9,
            },
          },
        },
      },
    })
  );

export default getTheme;
