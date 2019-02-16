import Jumbotron from "react-bootstrap/Jumbotron";
import Typed from "react-typed";

const typed = () => (
  <Jumbotron>
    <h3>Hur vill Sveriges partier förbättra</h3>
    <h3>
      <Typed strings={["jämlikhet.", "vården"]} typeSpeed={100} />
    </h3>
  </Jumbotron>
);

export default typed;
