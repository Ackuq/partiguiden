import { blueGrey, green, grey, red, teal } from '@material-ui/core/colors';
import { darken } from '@material-ui/core/styles';

export const voteListColors = {
  dark: {
    yes: teal[900],
    no: darken(red[600], 0.5),
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
    no: darken(red[600], 0.4),
    refrain: grey[200],
    absent: blueGrey[400],
  },
  light: {
    yes: teal[500],
    no: red[500],
    refrain: grey[600],
    absent: blueGrey[600],
  },
} as const;
