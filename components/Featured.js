/* Material UI import */
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";

import { withStyles } from "@material-ui/core/styles";

import { Link } from "../lib/routes";

const featuredStyles = theme => ({
  borderTop: {
    borderColor: theme.palette.primary.main,
    borderTop: "solid 1px",
    paddingTop: "0.5rem"
  },
  featured: {
    width: "100%",
    textAlign: "center",
    border: "1px solid",
    borderColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: grey[100]
    },
    "& a": {
      padding: "1rem",
      display: "flex",
      flexGrow: "1",
      color: grey[900],
      "& span": {
        width: "100%"
      }
    }
  }
});

export default withStyles(featuredStyles)(
  class Featured extends React.Component {
    getFeatured() {
      return [
        { id: "miljo", name: "Miljö och klimat" },
        { id: "vard-och-omsorg", name: "Vård och omsorg" },
        { id: "skola", name: "Skola och utbildning" },
        { id: "migration-och-integration", name: "Migration och integration" }
      ];
    }
    renderFeatured(obj) {
      return (
        <Grid key={`${obj.id}`} item xs={12} md={6}>
          <ButtonBase className={this.props.classes.featured} component="div">
            <Link route="subject" params={{ id: obj.id }}>
              <a>
                <span>{obj.name}</span>
              </a>
            </Link>
          </ButtonBase>
        </Grid>
      );
    }
    render() {
      return (
        <Grid container spacing={16} className={this.props.classes.borderTop}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Relevanta frågor i riksdagsvalet 2018
            </Typography>
          </Grid>
          {this.getFeatured().map(obj => this.renderFeatured(obj))}
        </Grid>
      );
    }
  }
);
