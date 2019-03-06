import { Link } from "../lib/routes";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";

export default class ListObject extends React.Component {
  renderSubject(subject) {
    return (
      <Grid
        item
        xs={12}
        md={6}
        key={`${subject.id}`}
        className="list-object standpoint-subject"
      >
        <ButtonBase>
          <Link route="subject" params={{ id: `${subject.id}` }}>
            <a className="text-dark">
              <span>{subject.name}</span>
            </a>
          </Link>
        </ButtonBase>
      </Grid>
    );
  }

  render() {
    let subjects = this.props.subjects;
    let letter = this.props.letter;
    return (
      <React.Fragment>
        {subjects.map(subject => this.renderSubject(subject))}
      </React.Fragment>
    );
  }
}
