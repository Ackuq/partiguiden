import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import ButtonBase from "@material-ui/core/ButtonBase";
import { withStyles } from "@material-ui/core/styles";

import VotingStyles from "./VotingStyles";

export default withStyles(VotingStyles)(
  class BehandladeDokument extends React.Component {
    state = {
      visible: false
    };

    render() {
      const { visible } = this.state;
      const { beslut, classes } = this.props;
      return (
        <div className={classes.contentContainer}>
          <ButtonBase
            onClick={() => this.setState({ visible: !visible })}
            classes={{ root: classes.button }}
          >
            <Typography variant="h4" color="inherit">
              Beslut
            </Typography>
          </ButtonBase>
          <Collapse in={visible}>
            <Typography
              variant="h5"
              style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
            >
              {beslut}
            </Typography>
          </Collapse>
        </div>
      );
    }
  }
);
