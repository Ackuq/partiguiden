export default class CustomizedTick extends React.Component {
  render() {
    const { value } = this.props.payload;
    let { x, y } = this.props;
    x = parseInt(x);
    y = parseInt(y);
    x = x - 27;
    y = y - 15;
    return (
      <image
        x={`${x}`}
        y={`${y}`}
        href={`../../static/images/party-logos/${value}.svg`}
        width="30"
        height="30"
      />
    );
  }
}
