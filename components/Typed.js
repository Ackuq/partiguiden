import Typed from "react-typed";

const typed = () => (
  <div className="list-title">
    <h4>Hur vill Sveriges partier förbättra</h4>
    <h4>
      <Typed
        strings={["miljön?", "jämlikheten?", "vården?", "Sverige?"]}
        typeSpeed={100}
        showCursor={false}
      />
      &nbsp;
    </h4>
  </div>
);

export default typed;
