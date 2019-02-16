import Jumbotron from 'react-bootstrap/Jumbotron';
import Typed from 'react-typed';

const typed = () => (
  <Jumbotron>
    <h3 className="text-center font-weight-light">Hur vill Sveriges partier förbättra&nbsp;
      <Typed strings={['jämlikhet.', 'vården' ]}
         typeSpeed={100} />
    </h3>
  </Jumbotron>
)

export default typed
