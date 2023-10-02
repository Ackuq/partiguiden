import { Divider } from "@components/common/divider";
import type { TooltipProps } from "recharts";

type ValueType = string | number;
type NameType = string;

interface EntryProps {
  name?: NameType;
  value?: ValueType;
}

function Entry({ name, value }: EntryProps) {
  if (!name || value === undefined) {
    return;
  }

  return (
    <li className="flex gap-2">
      <span>{name}:</span>
      <span>{value}</span>
    </li>
  );
}

export default function CustomTooltip({
  label,
  payload,
}: TooltipProps<ValueType, NameType>) {
  return (
    <div className="dark:bg-background-dark rounded-sm bg-white shadow-lg">
      <div className="px-3 pb-1 pt-2">{label}</div>
      <Divider />
      <ul className="grid px-3 pb-2 pt-1">
        {payload?.map((data) => (
          <Entry key={data.dataKey} name={data.name} value={data.value} />
        ))}
      </ul>
    </div>
  );
}
