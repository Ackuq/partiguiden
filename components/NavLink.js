import Nav from "react-bootstrap/Nav";
import ActiveLink from "./ActiveLink";
import Header from "./Header";

export default class NavLink extends React.Component {
  constructor(props) {
    super(props);
    this.getPages = this.getPages.bind(this);
    this.renNavlink = this.renNavlink.bind(this);
  }
  getPages() {
    return [
      { id: "/", title: "Hem" },
      { id: "/partiernas-standpunkter", title: "Partiernas Ståndpunkter" },
      { id: "/om-oss", title: "Om oss" }
    ];
  }

  renNavlink(props) {
    return (
      <ActiveLink
        activeClassName="active"
        href={`${props.id}`}
        key={`${props.id}`}
        onClick={this.props.closeNav}
        className="menu-btn btn-secondary"
        title={`${props.title}`}
      />
    );
  }

  render() {
    return (
      <Nav className="mr-auto">
        {this.getPages().map(page => this.renNavlink(page))}
      </Nav>
    );
  }
}
