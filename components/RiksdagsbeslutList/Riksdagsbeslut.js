import Link from "next/link";

import { withStyles } from "@material-ui/core/styles";

/* Material UI */
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ArrowDownRounded from "@material-ui/icons/KeyboardArrowDownRounded";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";

/* HTML parser */
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";

const beslut = theme => ({
  titleContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
  shown: {
    "-webkit-transform": "rotate(180deg)",
    transform: "rotate(180deg)"
  },
  paragraphContainer: {
    "& .beslutsParagraph": {
      fontSize: "1rem"
    },
    "& a": {
      color: "#212121"
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
              <Typography variant="h6" color="textSecondary" gutterBottom>
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
              <Button component="div">
                <Link href={this.props.beslut.dokument_url_html}>
                  <a target="_blank" rel="noopener">
                    Läs mer om beslutet
                  </a>
                </Link>
              </Button>
            </Collapse>
          </CardContent>
        </Card>
      );
    }
  }
);
