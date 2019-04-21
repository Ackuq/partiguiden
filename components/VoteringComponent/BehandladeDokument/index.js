import { Link } from "../../../lib/routes";
import Typography from "@material-ui/core/Typography";

import Collapse from "@material-ui/core/Collapse";
import ButtonBase from "@material-ui/core/ButtonBase";
import { withStyles } from "@material-ui/core/styles";
import ArrowDownRounded from "@material-ui/icons/KeyboardArrowDownRounded";

import VotingStyles from "./../VotingStyles";

export default withStyles(VotingStyles)(
  class BehandladeDokument extends React.Component {
    state = {
      visible: false
    };
    render() {
      const { visible } = this.state;
      const { behandladeDokument, classes } = this.props;

      const btnclass = visible ? classes.arrowVisible : "";

      return (
        <div className={classes.contentContainer}>
          <ButtonBase
            onClick={() => this.setState({ visible: !visible })}
            classes={{ root: classes.button }}
          >
            <Typography variant="h5" color="inherit">
              Behandlade dokument
            </Typography>
            <ArrowDownRounded
              classes={{
                root: `${classes.arrow} ${btnclass}`
              }}
            />
          </ButtonBase>
          <Collapse in={visible}>
            <div style={{ marginTop: "1.25rem" }}>
              {behandladeDokument.map((dokument, index) => (
                <React.Fragment key={dokument[3]}>
                  <Link route="dokument" params={{ id: dokument[3] }}>
                    <a>
                      <Typography variant="body1" color="primary">
                        [{index}] {dokument[0]}
                      </Typography>
                    </a>
                  </Link>
                  <br />
                </React.Fragment>
              ))}
            </div>
          </Collapse>
        </div>
      );
    }
  }
);
