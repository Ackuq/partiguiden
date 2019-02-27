import Typed from "react-typed";

const typed = () => (
  <div className="jumbotron">
    <h3>Hur vill Sveriges partier förbättra</h3>
    <h3>
      <Typed
        strings={["jämlikhet.", "vården"]}
        typeSpeed={100}
        showCursor={false}
      />
      &nbsp;
    </h3>
  </div>
);

export default typed;
