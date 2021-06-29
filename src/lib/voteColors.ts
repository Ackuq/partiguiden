import { blueGrey, green, grey, red, teal } from '@material-ui/core/colors';
import { darken } from '@material-ui/core/styles';

export const voteListColors = {
  dark: {
    yes: teal[500],
    no: darken(red[300], 0.2),
    losing: grey[600],
  },
  light: {
    yes: green[100],
    no: red[100],
    losing: grey[300],
  },
} as const;

export const voteColor = {
  dark: {
    yes: teal[600],
    no: red[600],
    refrain: grey[200],
    absent: blueGrey[300],
  },
  light: {
    yes: teal[500],
    no: red[500],
    refrain: grey[600],
    absent: blueGrey[600],
  },
} as const;
