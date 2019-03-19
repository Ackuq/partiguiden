import { withStyles } from "@material-ui/core/styles";

/* Material UI */
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ArrowDownRounded from "@material-ui/icons/KeyboardArrowDownRounded";
import ButtonBase from "@material-ui/core/ButtonBase";

/* HTML parser */
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";

const beslut = theme => ({
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem"
  },
  titel: {
    transition: "color 0.3s ease-in-out",
    "-webkit-transition": "color 0.4s ease-in-out",
    "-moz-transition": "color 0.3s ease-in-out",
    "-ms-transition": "color 0.3s ease-in-out",
    "-o-transition": "color 0.3s ease-in-out",
    "&:hover": {
      color: "#34495e"
    }
  },
  shown: {
    "-webkit-transform": "rotate(180deg)",
    transform: "rotate(180deg)"
  },
  paragraphContainer: {
    "& .beslutsParagraph": {
      fontSize: "1rem"
    }
  },
  buttonContainer: {
    margin: "auto 0",
    padding: "0.25rem",
    borderRadius: "2rem"
  },
  arrow: {
    "-webkit-transition": "transform 0.25s ease-in-out",
    transition: "transform 0.25s ease-in-out",
    fontSize: "2.5rem",
    color: theme.palette.primary.dark
  }
});

const equals = (nextState, currState) => {
  if (nextState.data === currState.data) return true;
  else return false;
};

function transform(node, index) {
  if (node.type === "tag" && node.name === "p") {
    node.attribs.class = "beslutsParagraph";
    return convertNodeToElement(node, index, transform);
  }
}

const options = {
  decodeEntities: true,
  transform
};

export default withStyles(beslut)(
  class Riksdagsbeslut extends React.Component {
    state = {
      visible: false
    };

    render() {
      let btnclass = this.state.visible ? this.props.classes.shown : "";
      return (
        <Card>
          <CardContent>
            <div className={this.props.classes.titleContainer}>
              <Typography
                className={this.props.classes.titel}
                variant="h6"
                color="textSecondary"
                gutterBottom
              >
                {this.props.beslut.notisrubrik}
              </Typography>

              <ButtonBase
                className={this.props.classes.buttonContainer}
                onClick={() => this.setState({ visible: !this.state.visible })}
              >
                <ArrowDownRounded
                  classes={{
                    root: `${this.props.classes.arrow} ${btnclass}`
                  }}
                />
              </ButtonBase>
            </div>
            <Collapse
              className={this.props.classes.paragraphContainer}
              in={this.state.visible}
            >
              {ReactHtmlParser(this.props.beslut.notis, options)}
            </Collapse>
          </CardContent>
        </Card>
      );
    }
  }
);
