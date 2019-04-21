import { Link } from "../../lib/routes";
import { withStyles } from "@material-ui/core/styles";

/* Material UI */
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

/* Custom components */
import VoteringResult from "./VoteringResult";

/* Functions */
import getOrganInfo from "./../../lib/authorityTable";
import getVotes from "./../../lib/getVotes";
import getMaxVotes from "./../../lib/getMaxVotes";

/* Axios */
import axios from "axios";

const votering = theme => ({
  titel: {
    marginBottom: "2rem",
    transition: "color 0.3s ease-in-out",
    "-webkit-transition": "color 0.4s ease-in-out",
    "-moz-transition": "color 0.3s ease-in-out",
    "-ms-transition": "color 0.3s ease-in-out",
    "-o-transition": "color 0.3s ease-in-out",
    "&:hover": {
      color: "#34495e"
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

export default withStyles(votering)(
  class Votering extends React.Component {
    state = {
      rubrik: "",
      organ: null,
      votes: {}
    };

    componentDidMount() {
      const { id, beteckning, tempbeteckning } = this.props.votering;
      const rm = id.substring(0, 2);
      this.getDocument(rm + "01" + beteckning, tempbeteckning);
    }

    async getDocument(bet, tempbet) {
      axios({
        method: "get",
        url: `https://data.riksdagen.se/dokumentstatus/${bet}.json`
      }).then(response => {
        if (typeof response.data === "string") {
          console.log("error: " + bet + " " + tempbet);
          return;
        }
        const { dokumentstatus } = response.data;
        const { organ } = dokumentstatus.dokument;
        const organInfo = getOrganInfo(organ);
        const { utskottsforslag } = dokumentstatus.dokutskottsforslag;

        const votering = Array.isArray(utskottsforslag)
          ? utskottsforslag[tempbet - 1]
          : utskottsforslag;

        const { table } = votering.votering_sammanfattning_html;
        const tableRow = Array.isArray(table)
          ? table[table.length - 1].tr
          : table.tr;

        let votes = getVotes(tableRow);
        votes = getMaxVotes(votes);

        this.setState({
          organ: organInfo,
          rubrik: votering.rubrik,
          votes: votes
        });
      });
    }

    render() {
      const { organ, rubrik, votes } = this.state;
      const { classes } = this.props;
      const { kall_id, tempbeteckning, titel } = this.props.votering;

      return (
        <React.Fragment>
          {organ && (
            <Card elevation={1}>
              <Link
                route="votering"
                params={{
                  id: kall_id,
                  bet: tempbeteckning
                }}
              >
                <a>
                  <CardHeader
                    title={organ.desc}
                    style={{ background: organ.color }}
                    classes={{
                      title: classes.headerTitle,
                      root: classes.headerRoot
                    }}
                  />

                  <CardContent>
                    <Typography
                      variant="h3"
                      color="textSecondary"
                      gutterBottom
                      classes={{ h3: classes.title }}
                    >
                      {titel}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      align="left"
                      classes={{ h6: classes.subtitle }}
                    >
                      {rubrik}
                    </Typography>
                  </CardContent>
                </a>
              </Link>
              <VoteringResult votes={votes} />
            </Card>
          )}
        </React.Fragment>
      );
    }
  }
);
