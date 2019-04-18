import "./dokumentStyles.scss";

export default class Dokument extends React.Component {
  render() {
    const { body } = this.props;

    return (
      <div className="container" style={{ paddingTop: "1.5rem" }}>
        {body}
      </div>
    );
  }
}
