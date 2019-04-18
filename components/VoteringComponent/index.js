/* Material UI */
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import BehandladeDokument from "./BehandladeDokument";
import Bilaga from "./Bilaga";
import PartiRoster from "./PartiRoster";
import Beslut from "./Beslut";

export default class Votering extends React.Component {
  render() {
    const { forslag, bilaga, behandladeDokument, beslut, voting } = this.props;
    return (
      <div className="container">
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Utskottets förslag
            </Typography>
            <Typography variant="body1" paragraph>
              {forslag}
            </Typography>
            {behandladeDokument && (
              <BehandladeDokument behandladeDokument={behandladeDokument} />
            )}
            <PartiRoster voting={voting} />
            <Beslut beslut={beslut} />
            {bilaga && <Bilaga bilaga={bilaga} />}
          </CardContent>
        </Card>
      </div>
    );
  }
}
