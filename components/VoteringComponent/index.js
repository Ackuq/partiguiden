/* Material UI */
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import TotalVote from "./TotalVote";
import BehandladeDokument from "./BehandladeDokument";
import Bilaga from "./Bilaga";
import RostFordelning from "./RostFordelning";
import Beslut from "./Beslut";

export default class Votering extends React.Component {
  render() {
    const {
      forslag,
      bilaga,
      behandladeDokument,
      beslut,
      voting,
      notisRubrik,
      notisBeskrivning
    } = this.props;
    return (
      <div className="container">
        <Card>
          <CardContent>
            <TotalVote voting={voting.Totalt} />
            <Typography
              variant="h5"
              style={{ marginBottom: "1rem" }}
              color="textSecondary"
            >
              {notisRubrik}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Utskottets förslag
            </Typography>
            <Typography variant="body1" paragraph>
              {forslag}
            </Typography>
            {behandladeDokument && (
              <BehandladeDokument behandladeDokument={behandladeDokument} />
            )}
            <RostFordelning voting={voting} />
            <Beslut beslut={beslut} notisBeskrivning={notisBeskrivning} />
            {bilaga && <Bilaga bilaga={bilaga} />}
          </CardContent>
        </Card>
      </div>
    );
  }
}
