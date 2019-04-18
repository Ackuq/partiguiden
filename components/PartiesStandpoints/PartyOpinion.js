import Link from "next/link";

/* Material UI components */
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class extends React.Component {
  render() {
    const partyName = this.props.partyName;
    const { name, url, opinions } = this.props.subject;
    return (
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              {name}
            </Typography>
            <ul>
              {opinions.map((opinion, index) => (
                <li
                  className="partyOpinions"
                  key={`${partyName}${name}${index}`}
                >
                  <Typography variant="body1">{opinion}</Typography>
                </li>
              ))}
            </ul>
            <Button component="div">
              <Link href={`${url}`}>
                <a target="_blank" className="d-flex p-1 m-1">
                  Läs mer på partiets hemsida
                </a>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}
