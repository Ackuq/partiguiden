import routes, { Router } from "../lib/routes";

import { withRouter } from "next/router";
import { withTheme } from "@material-ui/core/styles";

// Tabs
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function handleNav(event, href) {
  event.preventDefault();
  Router.pushRoute(href).then(() => window.scrollTo(0, 0));
}

function LinkTab(props) {
  return (
    <Tab
      className="nav-tab"
      component="a"
      onClick={event => handleNav(event, props.href)}
      {...props}
    />
  );
}

export default withTheme()(
  withRouter(
    class NavLinks extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getPages = this.getPages.bind(this);

        var index = this.getPages().findIndex(
          x => x.href == props.router.asPath
        );
        if (index < 0) {
          if (props.router.route == "/subject") index = 1;
          else index = 0;
        }
        this.state = {
          value: index
        };
      }

      getPages() {
        return [
          { href: "/", title: "Hem" },
          {
            href: "/partiernas-standpunkter",
            title: "Partiernas Ståndpunkter"
          },
          { href: "/riksdagsguiden", title: "Riksdagsguiden" },
          { href: "/om-oss", title: "Om oss" }
        ];
      }

      handleChange = (event, value) => {
        this.setState({ value });
      };

      renNavlink(props) {
        return (
          <LinkTab
            key={`${props.title}`}
            label={`${props.title}`}
            href={`${props.href}`}
          />
        );
      }

      render() {
        return (
          <AppBar position="sticky" className="nav-app-bar">
            <Tabs
              variant="scrollable"
              classes={{
                root: "app-tabs",
                indicator: "nav-indicator",
                scrollButtons: "scroll-button"
              }}
              value={this.state.value}
              onChange={this.handleChange}
            >
              {this.getPages().map(page => this.renNavlink(page))}
            </Tabs>
          </AppBar>
        );
      }
    }
  )
);
