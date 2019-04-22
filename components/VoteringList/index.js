import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import VoteringListContainer from "./VoteringListContainer";
import { updateFilter } from "./../../lib/store";
import Filter from "../Filter";

class VoteringList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <VoteringListContainer {...this.props} />
        </div>
        <Filter {...this.props} />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { filter } = state;
  return { filter };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateFilter }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteringList);
