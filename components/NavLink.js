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
      { href: "/", title: "Hem" },
      {
        href: "/partiernas-standpunkter",
        title: "Partiernas Ståndpunkter"
      },
      { href: "/om-oss", title: "Om oss" }
    ];
  }

  renNavlink(props) {
    return (
      <ActiveLink
        activeClassName="active"
        href={`${props.href}`}
        key={`${props.href}`}
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
