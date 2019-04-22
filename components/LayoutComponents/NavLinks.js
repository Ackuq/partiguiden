import routes, { Router } from "../../lib/routes";

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
      transition: "opacity 0.3s ease-in-out",
      "-webkit-transition": "opacity 0.4s ease-in-out",
      "-moz-transition": "opacity 0.3s ease-in-out",
      "-ms-transition": "opacity 0.3s ease-in-out",
      "-o-transition": "opacity 0.3s ease-in-out",
      "&:hover": {
        opacity: 1
      }
    },
    scrollButton: {
      display: "none"
    },
    scrollTab: {
      overflow: "hidden"
    }
  }
});

export default withStyles(tabTheme)(
  withRouter(
    class NavLinks extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: 0 };
      }

      getPages() {
        return [
          { href: "/", title: "Hem" },
          {
            href: "/partiernas-standpunkter",
            title: "Partiernas Ståndpunkter"
          },
          { href: "/riksdagsbeslut", title: "Riksdagsbeslut" },
          { href: "/voteringar", title: "Voteringar" },
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

      getStateValue() {
        const { pathname, route } = this.props.router;

        var index = this.getPages().findIndex(
          x => x.href == this.props.router.pathname
        );
        if (index < 0) {
          if (route == "/subject") index = 1;
          else if (route == "/beslut") index = 2;
          else if (route == "/votering") index = 3;
          else index = this.state.value;
        }
        this.state = { value: index };
      }
      render() {
        this.getStateValue();
        const { classes } = this.props;
        const { value } = this.state;
        return (
          <AppBar position="sticky">
            <Tabs
              action={this.test}
              variant="scrollable"
              classes={{
                scrollButtons: classes.scrollButton,
                scroller: classes.scrollTab
              }}
              value={value}
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
