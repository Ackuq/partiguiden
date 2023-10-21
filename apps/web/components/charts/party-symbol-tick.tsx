import type { Party } from "@partiguiden/party-data/types";

interface Props {
  payload?: {
    value: Party;
  };
  x?: string;
  y?: string;
  vertical?: boolean;
}

const PartySymbolTick = ({
  vertical = false,
  payload,
  x = "0",
  y = "0",
}: Props) => {
  if (!payload?.value) return;
  const party = payload.value;

  let X = parseInt(x, 10);
  let Y = parseInt(y, 10);
  if (vertical) {
    X -= 27;
    Y -= 15;
  } else {
    X -= 15;
    Y -= 5;
  }

  return (
    <image
      x={`${X}`}
      y={`${Y}`}
      href={`/party-logos/${party}-64.png`}
      className="h-6 w-6 sm:h-8 sm:w-8"
      width="32"
      height="32"
    />
  );
};

export default PartySymbolTick;
