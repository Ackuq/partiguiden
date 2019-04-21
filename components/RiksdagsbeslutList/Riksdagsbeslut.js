import { Link } from "../../lib/routes";

import { withStyles } from "@material-ui/core/styles";

/* Material UI */
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import ArrowDownRounded from "@material-ui/icons/KeyboardArrowDownRounded";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";

/* HTML parser */
import parse from "html-react-parser";

/* Axios */
import axios from "axios";

import getOrganInfo from "./../../lib/authorityTable";
import checkVote from "./checkVote";

const beslut = theme => ({
  shown: {
    "-webkit-transform": "rotate(180deg)",
    transform: "rotate(180deg)"
  },
  paragraphContainer: {
    "& a": {
      color: "#212121"
    },
    "& .paragraph p": {
      fontSize: "1rem"
    }
  },
  title: {
    fontSize: "1.125rem",
    lineHeight: 1.3,
    color: theme.palette.primary.dark
  },
  subtitle: {
    fontSize: "1rem",
    lineHeight: 1.25
  },
  buttonContainer: {
    display: "block",
    width: "100%"
  },
  arrow: {
    "-webkit-transition": "transform 0.25s ease-in-out",
    transition: "transform 0.25s ease-in-out",
    fontSize: "2rem",
    color: theme.palette.primary.dark
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 1rem "
  },
  headerTitle: {
    fontSize: "1.15rem",
    color: "#ffffff"
  },
  headerRoot: {
    width: "100%",
    textAlign: "left",
    padding: "0.25rem 1rem"
  }
});

function transform(node, index) {
  if (node.type === "tag" && node.name === "p") {
    node.attribs.class = "beslutsParagraph";
    return convertNodeToElement(node, index, transform);
  }
}

export default withStyles(beslut)(
  class Riksdagsbeslut extends React.Component {
    state = {
      visible: false,
      organ: null,
      voteringarExist: false
    };

    componentDidMount() {
      const { beslut } = this.props;
      let { dokumentstatus_url_xml } = beslut;
      dokumentstatus_url_xml = dokumentstatus_url_xml.replace(".xml", ".json");
      axios({ method: "get", url: "https:" + dokumentstatus_url_xml }).then(
        response => {
          if (typeof response.data === "string") return;
          const { dokumentstatus } = response.data;
          const { organ } = dokumentstatus.dokument;
          const { utskottsforslag } = dokumentstatus.dokutskottsforslag;
          const organInfo = getOrganInfo(organ);
          const voteringarExist = checkVote(utskottsforslag);
          this.setState({
            organ: organInfo,
            voteringarExist: voteringarExist
          });
        }
      );
    }

    render() {
      const { visible, organ, voteringarExist } = this.state;
      const { classes, beslut } = this.props;
      const btnclass = visible ? classes.shown : "";
      return (
        <React.Fragment>
          {organ && (
            <Card>
              <ButtonBase
                className={classes.buttonContainer}
                onClick={() => this.setState({ visible: !visible })}
              >
                <CardHeader
                  title={organ.desc}
                  style={{ background: organ.color }}
                  classes={{
                    title: classes.headerTitle,
                    root: classes.headerRoot
                  }}
                />

                <CardContent classes={{ root: classes.cardContent }}>
                  <div>
                    <Typography
                      variant="h3"
                      align="left"
                      gutterBottom
                      classes={{ h3: classes.title }}
                    >
                      {beslut.notisrubrik}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      align="left"
                      classes={{ h6: classes.subtitle }}
                    >
                      {beslut.titel}
                    </Typography>
                  </div>
                  <ArrowDownRounded
                    classes={{
                      root: `${classes.arrow} ${btnclass}`
                    }}
                  />
                </CardContent>
              </ButtonBase>

              <CardContent>
                <Collapse className={classes.paragraphContainer} in={visible}>
                  <div className="paragraph">{parse(beslut.notis)}</div>
                  <Button component="div">
                    <Link route="dokument" params={{ id: beslut.id }}>
                      <a>Läs mer om betänkandet</a>
                    </Link>
                  </Button>
                  {voteringarExist && (
                    <Button component="div">
                      <Link
                        route="voteringar"
                        params={{
                          rm: beslut.rm,
                          bet: beslut.beteckning,
                          num: beslut.nummer,
                          org: `${organ.code}`
                        }}
                      >
                        <a>Läs mer om voteringarna</a>
                      </Link>
                    </Button>
                  )}
                </Collapse>
              </CardContent>
            </Card>
          )}
        </React.Fragment>
      );
    }
  }
);
