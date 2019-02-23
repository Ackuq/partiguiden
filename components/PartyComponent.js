import Link from "next/link";
import Collapse from "@material-ui/core/Collapse";
import ButtonBase from "@material-ui/core/ButtonBase";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <div
        key={`${this.props.party.name}`}
        id={`${this.props.party.name}`}
        className="party-standpoint mb-3 mt-1"
      >
        <ButtonBase onClick={this.handleClick}>
          <h3>{this.props.party.name}</h3>
        </ButtonBase>
        <Collapse in={this.state.visible}>
          {this.props.party.subjects.map(subject => (
            <div
              key={`${this.props.party.name}${subject.name}`}
              className="standpoints"
            >
              <h4>{subject.name}</h4>
              <ul>
                {subject.opinions.map((opinion, index) => (
                  <li key={`${this.props.party.name}${subject.name}${index}`}>
                    {opinion}
                  </li>
                ))}
              </ul>
              <Link href={`${subject.address}`}>
                <a target="_blank" className="d-flex p-1 m-1">
                  Läs mer på partiets hemsida
                </a>
              </Link>
            </div>
          ))}
        </Collapse>
      </div>
    );
  }
}
