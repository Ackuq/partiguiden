/* Custom components */
import Type from "../components/Typed";

/* Bootstrap imports */
import { Container, Col, Row } from "react-bootstrap";

/* Material UI import */
import ButtonBase from "@material-ui/core/ButtonBase";

/* Next-js imports */
import Head from "next/head";
import Link from "next/link";

export default () => (
  <div style={{ marginTop: "-2rem" }}>
    <Head>
      <title>Partiguiden.nu | Rösta rätt</title>
    </Head>
    <Type />
    <Container>
      <p>
        Vet du inte vad du ska rösta på till valet 2018? Vet du inte vad
        Sveriges partier har för åsikter i olika sakfrågor? Känn dig inte ensam
        i så fall! Med så många partier i riksdagen kan det vara svårt att veta
        vad alla tar för ståndpunkter i olika frågor, därför har Partiguiden
        blivit till. Denna guide hjälper dig jämföra olika partiers partiprogram
        så att du lättare kan hitta det parti som du sympatiserar mest med. Gör
        rätt val i valet 2018.
      </p>
      <p>
        Klicka{" "}
        <Link href="/partiernas-standpunkter">
          <a className="text-primary">här</a>
        </Link>{" "}
        eller på fliken "Partiernas ståndpunkter" för att börja jämföra vad
        partierna har för åsikter i just de frågorna som du har nära till
        hjärtat!
      </p>
    </Container>
    <Container>
      <h3 className="border-top border-primary pt-3 font-weight-light">
        Relevanta frågor i riksdagsvalet 2018
      </h3>
      <Row>
        <Col md={6}>
          <ButtonBase className="featured shadow-sm">Hej</ButtonBase>
        </Col>
        <Col md={6}>
          <ButtonBase className="featured shadow-sm">Hej</ButtonBase>
        </Col>

        <Col md={6}>
          <ButtonBase className="featured shadow-sm">Hej</ButtonBase>
        </Col>
        <Col md={6}>
          <ButtonBase className="featured shadow-sm">Hej</ButtonBase>
        </Col>

        <Col md={6} />
        <Col md={6} />
      </Row>
    </Container>
  </div>
);
