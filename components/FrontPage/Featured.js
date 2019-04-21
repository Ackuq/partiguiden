/* Material UI import */
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";

import { withStyles } from "@material-ui/core/styles";

import { Link } from "../../lib/routes";

const featuredStyles = theme => ({
  featured: {
    width: "100%",
    textAlign: "center",
    border: "2px solid",
    borderColor: theme.palette.secondary.main,
    borderRadius: "3rem",
    "&:hover": {
      backgroundColor: grey[100]
    },
    "& a": {
      fontWeight: "400",
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

    render() {
      return (
        <Grid container spacing={16}>
          {this.getFeatured().map(obj => (
            <Grid key={`${obj.id}`} item xs={12} md={6}>
              <ButtonBase
                className={this.props.classes.featured}
                component="div"
              >
                <Link route="subject" params={{ id: obj.id }}>
                  <a>
                    <span>{obj.name}</span>
                  </a>
                </Link>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      );
    }
  }
);
