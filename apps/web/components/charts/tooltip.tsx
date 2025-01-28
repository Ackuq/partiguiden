import type { TooltipProps } from "recharts";
import { twMerge } from "tailwind-merge";

import { Divider } from "@components/common/divider";

type ValueType = string | number;
type NameType = string;

interface EntryProps {
  name?: NameType;
  value?: ValueType;
  unit?: React.ReactNode;
  nameFormatter?: (name: string) => string;
  valueFormatter?: (value: string | number) => string;
}

function Entry({
  name,
  value,
  unit,
  nameFormatter,
  valueFormatter,
}: EntryProps) {
  if (!name || value === undefined) {
    return;
  }

  return (
    <li className="flex gap-2">
      <span>{nameFormatter ? nameFormatter(name) : name}:</span>
      <span>
        {valueFormatter ? valueFormatter(value) : value}
        {unit}
      </span>
    </li>
  );
}

export default function CustomTooltip({
  label,
  payload,
  labelFormatter,
  nameFormatter,
  valueFormatter,
  Details,
}: TooltipProps<ValueType, NameType> & {
  Details?: React.ElementType<{
    payload: typeof payload;
  }>;
  nameFormatter?: (name: string) => string;
  valueFormatter?: (value: string | number) => string;
}) {
  return (
    <div className="rounded-xs bg-white shadow-lg dark:bg-slate-950">
      {label && (
        <>
          <div className="px-3 pb-1 pt-2">
            {labelFormatter ? labelFormatter(label, payload ?? []) : label}
          </div>
          <Divider />
        </>
      )}
      <ul className={twMerge("flex flex-col px-3 pb-2 pt-1", !label && "pt-2")}>
        {payload?.map((data) => (
          <Entry
            key={data.dataKey}
            name={data.name}
            value={data.value}
            unit={data.unit}
            nameFormatter={nameFormatter}
            valueFormatter={valueFormatter}
          />
        ))}
        {Details && <Details payload={payload} />}
      </ul>
    </div>
  );
}
