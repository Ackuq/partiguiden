import { blueGrey, green, grey, red, teal } from '@material-ui/core/colors';

export const voteListColors = {
  dark: {
    yes: teal[800],
    no: red[600],
    losing: grey[700],
  },
  light: {
    yes: green[100],
    no: red[100],
    losing: grey[300],
  },
} as const;

export const voteColor = {
  dark: {
    yes: teal[700],
    no: red[600],
    refrain: blueGrey[400],
    absent: grey[900],
  },
  light: {
    yes: teal[500],
    no: red[500],
    refrain: grey[600],
    absent: blueGrey[600],
  },
} as const;
