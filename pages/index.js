import Type from '../components/Typed';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from '@material-ui/core/Button';


import Link from 'next/link'

export default () => (
  <div>
    <Type />
    <Container>
      <p>Vet du inte vad du ska rösta på till valet 2018? Vet du inte vad Sveriges partier har för åsikter i olika sakfrågor? Känn dig inte ensam i så fall! Med så många partier i riksdagen kan det vara svårt att veta vad alla tar för ståndpunkter i olika frågor, därför har Partiguiden blivit till. Denna guide hjälper dig jämföra olika partiers partiprogram så att du lättare kan hitta det parti som du sympatiserar mest med. Gör rätt val i valet 2018.</p>
      <p>Klicka <Link href="/partiernas-standpunkter"><a className="text-info">här</a></Link> eller på fliken "Partiernas ståndpunkter" för att börja jämföra vad partierna har för åsikter i just de frågorna som du har nära till hjärtat!</p>
    </Container>
    <Container>
      <h3 className="border-top border-primary pt-3 font-weight-light">Relevanta frågor i riksdagsvalet 2018</h3>
      <Row>
        <Col md={6}>
          <Button className="featured shadow-sm">
            Hej
          </Button>
        </Col>
        <Col md={6}>
          <Button className="featured shadow-sm">
            Hej
          </Button>
        </Col>

        <Col md={6}>
          <Button className="featured shadow-sm">
            Hej
          </Button>
        </Col>
        <Col md={6}>
          <Button className="featured shadow-sm">
            Hej
          </Button>
        </Col>

        <Col md={6}>
        </Col>
        <Col md={6}>
        </Col>
      </Row>
    </Container>
  </div>
)
