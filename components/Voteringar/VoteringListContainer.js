import VoteringList from "./VoteringList";

export default class VoteringListContainer extends React.Component {
  render() {
    return <VoteringList page={this.props.page} />;
  }
}
