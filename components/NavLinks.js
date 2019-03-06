import routes, { Router } from "../lib/routes";

import { withRouter } from "next/router";
import { withStyles } from "@material-ui/core/styles";
// Tabs
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const tabTheme = theme => ({
  [theme.breakpoints.up("sm")]: {
    navTab: {
      flexGrow: 1,
      maxWidth: "none",
      transition: "opacity 0.3s ease",
      "-webkit-transition": "opacity 0.4s ease",
      "-moz-transition": "opacity 0.3s ease",
      "-ms-transition": "opacity 0.3s ease-in-out",
      "-o-transition": "opacity 0.3s ease-in-out",
      "&:hover": {
        opacity: 1
      }
    },
    scrollButton: {
      display: "none"
    }
  }
});

export default withStyles(tabTheme)(
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
        event.preventDefault();
        this.setState({ value });
        Router.pushRoute(this.getPages()[value].href).then(() =>
          window.scrollTo(0, 0)
        );
      };

      renNavlink(props) {
        return (
          <Tab
            classes={{ root: this.props.classes.navTab }}
            key={`${props.title}`}
            label={`${props.title}`}
            href={`${props.href}`}
          />
        );
      }

      render() {
        const classes = this.props.classes;
        return (
          <AppBar position="sticky" className="nav-app-bar">
            <Tabs
              variant="scrollable"
              classes={{
                scrollButtons: classes.scrollButton
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
