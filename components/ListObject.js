import { Link } from "../lib/routes";

/* Material UI components */
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const listTheme = theme => ({
  button: {
    width: "100%",
    "& a": {
      display: "flex",
      flexGrow: "1",
      color: grey[900],
      "& span": {
        width: "100%",
        lineHeight: "50px",
        padding: "0 0.5rem",
        "-webkit-transition": "all 0.4s ease-in-out",
        "-moz-transition": "all 0.4s ease-in-out",
        "-ms-transition": "all 0.4s ease-in-out",
        "-o-transition": "all 0.4s ease-in-out",
        transition: "all 0.4s ease-in-out",
        background: "linear-gradient( to left, transparent 50%, #00796b 50% )",
        backgroundSize: "202% 100%",
        backgroundPosition: "right bottom",
        backgroundRepeat: "no-repeat"
      },
      "&:hover span": {
        backgroundPosition: "left bottom",
        color: grey[100]
      }
    }
  },

  item: {
    [theme.breakpoints.down("sm")]: {
      borderColor: theme.palette.primary.main,
      borderLeft: "solid 2px"
    },
    [theme.breakpoints.up("md")]: {
      "&:nth-child(2n + 1)": {
        borderColor: theme.palette.primary.main,
        borderLeft: "solid 2px"
      },
      "&:nth-child(2n)": {
        borderRight: "solid 2px",
        borderColor: theme.palette.primary.main
      }
    },
    "&:nth-child(3n) a": {
      backgroundColor: grey[50]
    },
    "&:nth-child(3n + 1) a": {
      backgroundColor: grey[100]
    },
    "&:nth-child(3n + 2) a": {
      backgroundColor: grey[200]
    }
  }
});

export default withStyles(listTheme)(
  class ListObject extends React.Component {
    render() {
      return (
        <Grid item xs={12} md={6} className={this.props.classes.item}>
          <ButtonBase className={this.props.classes.button}>
            <Link route="subject" params={{ id: `${this.props.subject.id}` }}>
              <a>
                <span>{this.props.subject.name}</span>
              </a>
            </Link>
          </ButtonBase>
        </Grid>
      );
    }
  }
);
