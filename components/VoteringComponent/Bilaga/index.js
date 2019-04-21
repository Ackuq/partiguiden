import { Link } from "../../../lib/routes";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import VotingStyles from "./../VotingStyles";

export default withStyles(VotingStyles)(
  class BehandladeDokument extends React.Component {
    render() {
      const { bilaga, classes } = this.props;
      return (
        <div>
          <Typography variant="h5" color="inherit" gutterBottom>
            Bilaga
          </Typography>
          <Link href={bilaga.fil_url}>
            <a target="_blank" rel="noopener">
              <Typography variant="body1" color="primary">
                {bilaga.titel} {bilaga.dok_id}
              </Typography>
            </a>
          </Link>
        </div>
      );
    }
  }
);
