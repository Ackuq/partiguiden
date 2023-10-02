interface Props {
  payload?: {
    value: string;
  };
  x?: string;
  y?: string;
  vertical?: boolean;
}

const PartySymbolTick = ({
  vertical = false,
  payload: { value } = { value: "" },
  x = "0",
  y = "0",
}: Props) => {
  const href = value
    ? `/static/images/party-logos/${value.toUpperCase()}-low-res.png`
    : "";
  let X = parseInt(x, 10);
  let Y = parseInt(y, 10);
  if (vertical) {
    X -= 27;
    Y -= 15;
  } else {
    X -= 15;
    Y -= 5;
  }

  return <image x={`${X}`} y={`${Y}`} href={href} width="30" height="30" />;
};

export default PartySymbolTick;
