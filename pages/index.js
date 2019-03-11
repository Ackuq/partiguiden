/* Custom components */
import Type from "../components/Typed";
import Featured from "../components/Featured";
/* Material UI import */
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
          <Grid container>
            <Grid item xs style={{ marginBottom: "1rem" }}>
              <p>
                Vet du inte vad du ska rösta på till valet 2018? Vet du inte vad
                Sveriges partier har för åsikter i olika sakfrågor? Känn dig
                inte ensam i så fall! Med så många partier i riksdagen kan det
                vara svårt att veta vad alla tar för ståndpunkter i olika
                frågor, därför har Partiguiden blivit till. Denna guide hjälper
                dig jämföra olika partiers partiprogram så att du lättare kan
                hitta det parti som du sympatiserar mest med. Gör rätt val i
                valet 2018.
              </p>
              <p>
                Klicka på fliken "Partiernas ståndpunkter" för att börja jämföra
                vad partierna har för åsikter i just de frågorna som du har nära
                till hjärtat!
              </p>
            </Grid>
          </Grid>
          <Featured />
        </div>
      </React.Fragment>
    );
  }
}
