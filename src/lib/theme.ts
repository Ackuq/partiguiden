import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Palette } from '@material-ui/core/styles/createPalette';
import { Typography } from '@material-ui/core/styles/createTypography';

declare module '@material-ui/styles/defaultTheme' {
  interface DefaultTheme {
    palette: Palette;
    typography: Typography;
    shadows: Array<string>;
    spacing: Function;
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00796b',
      dark: '#004c40',
      light: '#009688',
      contrastText: '#f8f9fa',
    },
    secondary: {
      main: '#80cbc4',
      dark: '#006978',
      light: '#56c8d8',
      contrastText: '#a3cfca',
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
});

export default theme;
