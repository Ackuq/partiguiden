/* Custom components */
import Type from "../components/Typed";

/* Material UI import */
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

/* Next-js imports */
import Head from "next/head";
import Link from "next/link";

const indexStyles = theme => ({
  borderTop: {
    borderColor: theme.palette.primary.main,
    borderTop: "solid 1px"
  },
  featured: {
    width: "100%",
    border: "1px solid",
    margin: "0.5rem 0",
    padding: "1rem",
    borderColor: theme.palette.secondary.main
  }
});

export default withStyles(indexStyles)(
  class Index extends React.Component {
    render() {
      return (
        <React.Fragment>
          <Head>
            <title>Partiguiden.nu | Rösta rätt</title>
          </Head>
          <Type />
          <div className="container">
            <Grid container>
              <Grid item xs style={{ marginBottom: "1rem" }}>
                <p>
                  Vet du inte vad du ska rösta på till valet 2018? Vet du inte
                  vad Sveriges partier har för åsikter i olika sakfrågor? Känn
                  dig inte ensam i så fall! Med så många partier i riksdagen kan
                  det vara svårt att veta vad alla tar för ståndpunkter i olika
                  frågor, därför har Partiguiden blivit till. Denna guide
                  hjälper dig jämföra olika partiers partiprogram så att du
                  lättare kan hitta det parti som du sympatiserar mest med. Gör
                  rätt val i valet 2018.
                </p>
                <p>
                  Klicka på fliken "Partiernas ståndpunkter" för att börja
                  jämföra vad partierna har för åsikter i just de frågorna som
                  du har nära till hjärtat!
                </p>
              </Grid>
            </Grid>
            <Grid
              style={{ paddingTop: "1rem" }}
              container
              spacing={8}
              className={this.props.classes.borderTop}
            >
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Relevanta frågor i riksdagsvalet 2018
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <ButtonBase className={this.props.classes.featured}>
                  Hej
                </ButtonBase>
              </Grid>
              <Grid item xs={12} md={6}>
                <ButtonBase className={this.props.classes.featured}>
                  Hej
                </ButtonBase>
              </Grid>

              <Grid item xs={12} md={6}>
                <ButtonBase className={this.props.classes.featured}>
                  Hej
                </ButtonBase>
              </Grid>
              <Grid item xs={12} md={6}>
                <ButtonBase className={this.props.classes.featured}>
                  Hej
                </ButtonBase>
              </Grid>
            </Grid>
          </div>
        </React.Fragment>
      );
    }
  }
);
