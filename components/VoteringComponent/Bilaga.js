import { Link } from "../../lib/routes";

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
      const { bilaga, classes } = this.props;
      return (
        <div>
          <ButtonBase
            onClick={() => this.setState({ visible: !visible })}
            classes={{ root: classes.button }}
          >
            <Typography variant="h4" color="inherit">
              Bilaga
            </Typography>
          </ButtonBase>
          <Collapse in={visible}>
            <Typography variant="body1">
              <Link href={bilaga.fil_url}>
                <a target="_blank" rel="noopener">
                  {bilaga.titel} {bilaga.dok_id}
                </a>
              </Link>
            </Typography>
          </Collapse>
        </div>
      );
    }
  }
);
