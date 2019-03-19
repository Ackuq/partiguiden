import { Link } from "../../lib/routes";
import { withStyles } from "@material-ui/core/styles";

/* Material UI */
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

/* Custom components */
import VoteringResult from "./VoteringResult";

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
  }
});

const parseData = data => {
  data = data.split("Ledamotsröster")[0].split("Frånvarande")[1];
  data = data.split("Omröstning i motivfrågan")[0];
  data = data.split(/\b(SD|MP|KD|S|M|C|V|L|Totalt)/g);

  var data = data.filter(function(value, index, arr) {
    return value != "" && value != "\r\n\r\n";
  });

  let result = {};
  let yesTotal = 0,
    noTotal = 0;

  for (let i = 0; i < data.length; i++) {
    if (/^[a-zA-Z]+$/.test(data[i]) && !data[i].match("Totalt")) {
      let party = data[i];
      let val = data[++i].split(/\D+/);
      val = val.filter(function(value, index) {
        return value !== "";
      });

      val = val.splice(0, 2);
      let yes = parseInt(val[0]);
      let no = parseInt(val[1]);
      yesTotal += yes;
      noTotal += no;

      if (!(yes === no)) {
        if (yes > no) result[party] = 1;
        else result[party] = 0;
      }
    }
  }
  let total;
  if (yesTotal > noTotal) {
    total = "yes";
  } else {
    total = "no";
  }
  return [result, total];
};
const equals = (nextState, currState) => {
  if (nextState.data === currState.data) return true;
  else return false;
};

export default withStyles(votering)(
  class Votering extends React.Component {
    state = {
      data: {},
      total: "",
      done: false
    };

    shouldComponentUpdate(nextProps, nextState) {
      return !equals(nextState, this.state);
    }

    componentDidMount() {
      this.getDocument(this.props.votering.dokument_url_text);
    }

    async getDocument(page) {
      page = "https:" + page;
      var request = new XMLHttpRequest();
      request.open("GET", page, true);
      var data;
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          let data = parseData(request.responseText);
          this.setState({
            data: data[0],
            total: data[1],
            done: true
          });
        } else {
          // We reached our target server, but it returned an error
        }
      };
      request.send();
    }

    render() {
      let title = this.props.votering.titel.split("Omröstning: betänkande ")[1];
      title = title.substr(title.indexOf(" ") + 1);
      return (
        <Card>
          <CardContent>
            <Link
              route="votering"
              params={{
                id: this.props.votering.kall_id,
                bet: this.props.votering.tempbeteckning
              }}
            >
              <a>
                <Typography
                  className={this.props.classes.titel}
                  variant="h5"
                  color="textSecondary"
                  gutterBottom
                >
                  {title}
                </Typography>
              </a>
            </Link>
            {this.state.done && (
              <VoteringResult
                data={this.state.data}
                total={this.state.total}
                votering={this.props.votering}
              />
            )}
          </CardContent>
        </Card>
      );
    }
  }
);
