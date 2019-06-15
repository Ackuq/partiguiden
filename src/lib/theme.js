import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00796b',
      dark: '#004c40',
      light: '#48a999',
      contrastText: '#f8f9fa'
    },
    secondary: {
      main: '#80cbc4',
      dark: '#006978',
      light: '#56c8d8',
      contrastText: '#a3cfca'
    }
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiTypography: {
      h4: {
        fontWeight: '300'
      }
    },
    MuiButtonBase: {
      root: {
        fontSize: '1rem',
        fontFamily: 'inherit',
        '-webkit-transition': 'background-color 0.4s ease-in-out',
        '-moz-transition': 'background-color 0.4s ease-in-out',
        '-ms-transition': 'background-color 0.4s ease-in-out',
        '-o-transition': 'background-color 0.4s ease-in-out',
        transition: 'background-color 0.4s ease-in-out'
      }
    }
  }
});

export default theme;
