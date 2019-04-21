export default class Dokument extends React.Component {
  render() {
    const { body } = this.props;

    return (
      <div className="container dokumentBody" style={{ paddingTop: "1.5rem" }}>
        {body}
      </div>
    );
  }
}
