import RiksdagsList from "./RiksdagsList";

export default class RiksdagsListContainer extends React.Component {
  render() {
    return <RiksdagsList page={this.props.page} />;
  }
}
