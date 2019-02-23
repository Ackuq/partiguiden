import { Link } from "../lib/routes";
import ButtonBase from "@material-ui/core/ButtonBase";

export default class ListObject extends React.Component {
  render() {
    let subjects = this.props.subjects;
    let letter = this.props.letter;
    let oddNumber = subjects.length % 2;
    return (
      <React.Fragment>
        <div className="letter text-white text-center w-100">
          <header>{letter}</header>
        </div>
        <div className="list">
          {subjects.map(subject => (
            <ButtonBase className="list-object" key={`{${subject.id}}`}>
              <Link route="subject" params={{ id: `${subject.id}` }} passHref>
                <a className="text-dark">
                  <span className="px-2">{subject.name}</span>
                </a>
              </Link>
            </ButtonBase>
          ))}
          {oddNumber === 1 && <div className="empty-col" />}
        </div>
      </React.Fragment>
    );
  }
}
