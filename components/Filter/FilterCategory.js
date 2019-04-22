import { table } from "../../lib/authorityTable";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const filterCategoryStyles = theme => ({
  catergoryContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withStyles(filterCategoryStyles)(
  class FilterCategory extends React.Component {
    state = {
      categories: {}
    };

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.catergoryContainer}>
          <FormGroup>
            {table.map(object => (
              <FormControlLabel
                key={object.code}
                control={<Checkbox color="primary" />}
                label={object.desc}
              />
            ))}
          </FormGroup>
        </div>
      );
    }
  }
);
