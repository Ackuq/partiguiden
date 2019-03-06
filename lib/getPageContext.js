import { SheetsRegistry } from "jss";
import {
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00796b",
      dark: "#004c40",
      light: "#48a999",
      contrastText: "#f8f9fa"
    },
    secondary: {
      main: "#80cbc4",
      dark: "#006978",
      light: "#56c8d8",
      contrastText: "#a3cfca;"
    }
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiTypography: {
      h4: {
        fontWeight: "300"
      }
    },
    MuiInputBase: {
      root: {
        "&$focused": {
          width: "100% !important"
        }
      }
    }
  }
});

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  };
}

let pageContext;

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}
