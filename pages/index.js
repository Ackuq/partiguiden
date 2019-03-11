/* Custom components */
import Type from "../components/Typed";
import Featured from "../components/Featured";
/* Material UI import */
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

/* Next-js imports */
import Head from "next/head";

export default class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Partiguiden.nu | Rösta rätt</title>
        </Head>
        <Type />
        <div className="container">
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h4" paragraph align={"center"}>
                    Vilket parti ska man rösta på?
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Vet du inte vad du ska rösta på till valet 2018? Vet du inte
                    vad Sveriges partier har för åsikter i olika sakfrågor? Känn
                    dig inte ensam i så fall! Med så många partier i riksdagen
                    kan det vara svårt att veta vad alla tar för ståndpunkter i
                    olika frågor, därför har Partiguiden blivit till. Denna
                    guide hjälper dig jämföra olika partiers partiprogram så att
                    du lättare kan hitta det parti som du sympatiserar mest med.
                    Gör rätt val i valet 2018.
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Klicka på fliken "Partiernas ståndpunkter" för att börja
                    jämföra vad partierna har för åsikter i just de frågorna som
                    du har nära till hjärtat!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h4" paragraph align={"center"}>
                    Relevanta frågor i riksdagsvalet 2018
                  </Typography>
                  <Featured />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
