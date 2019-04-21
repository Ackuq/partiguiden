/* Material UI import */
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

/* Next-js imports */
import Head from "next/head";

/* Custom components */
import Type from "../components/FrontPage/Typed";
import Featured from "../components/FrontPage/Featured";

export default class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Partiguiden.nu | Rösta rätt</title>
          <meta
            name="description"
            content="Vad tar Sveriges partier för ståndpunkter i sakfrågor? På Partiguiden kan du hitta och jämföra vad partierns åsikter för att hitta det parti du sympatiserar mest med."
          />
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
                  <Typography
                    variant="body1"
                    paragraph
                    style={{ fontSize: "1.25rem" }}
                  >
                    Vilket parti ska man rösta på? Och vad tycker partierna
                    egentligen? På Partiguiden.nu kan du läsa om vad partierna
                    tycker enligt sina partiprogram och samt se hur de röstar i
                    riksdagsvoteringar.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h4" paragraph align={"center"}>
                    Aktuella frågor
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
