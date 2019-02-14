import Jumbotron from 'react-bootstrap/Jumbotron';
import Typed from 'react-typed';

const typed = () => (
  <Jumbotron>
    <h3>Hur vill Sveriges partier förbättra
      <Typed strings={['jämlikhet.', 'vården' ]}
         typeSpeed={40} />
    </h3>
  </Jumbotron>
)

export default typed
