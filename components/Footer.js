import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const footer = () => (
  <Container>
    <Row className="text-center">
      <Col md={{ span: 4, offset: 4 }}>© Axel Pettersson 2019</Col>
      <Col md={{ span: 4, offset: 4 }}>
        <a href="mailto:contact@partiguiden.nu">contact@partiguiden.nu</a>
      </Col>
      <Col md={{ span: 4, offset: 4 }} />
    </Row>
  </Container>
);

export default footer;
