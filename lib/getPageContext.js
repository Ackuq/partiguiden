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
      light: "#48a999"
    },
    secondary: {
      main: "#80cbc4",
      dark: "#006978",
      light: "#56c8d8"
    }
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiInputBase: {
      root: {
        width: "75%",
        float: "right",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        "-webkit-transition": "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        "-moz-transition": "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        "-ms-transition": "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        "-o-transition": "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        backgroundColor: "#009688",
        borderRadius: "4px",
        padding: "0.25rem 0.5rem",
        "&$focused": {
          width: "100% !important"
        }
      },

      input: {
        color: "#ffffff",
        backgroundColor: "#009688",
        "&::placeholder": {
          opacity: "0.8"
        }
      }
    },
    MuiTab: {
      root: {
        transition: "opacity 0.3s ease",
        "-webkit-transition": "opacity 0.4s ease",
        "-moz-transition": "opacity 0.3s ease",
        "-ms-transition": "opacity 0.3s ease-in-out",
        "-o-transition": "opacity 0.3s ease-in-out",
        "&:hover": {
          opacity: 1
        }
      }
    },
    MuiFormLabel: {
      root: {
        width: "100%"
      }
    },
    MuiMenuItem: {
      root: {
        width: "100%"
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
