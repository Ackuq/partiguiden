import type { DefaultLegendContentProps } from "recharts";

interface EntryProps {
  value: string;
  color?: string;
}

function Entry({ value, color }: EntryProps) {
  return (
    <li className="whitespace-nowrap text-sm">
      <span
        className="mb-[1px] mr-2 inline-block h-2 w-2 rounded-full"
        style={{
          background: color,
        }}
      />
      <span>{value}</span>
    </li>
  );
}

export default function CustomLegend({ payload }: DefaultLegendContentProps) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-3">
      {payload?.map((data) => (
        <Entry
          key={(data.dataKey as string) ?? data.value ?? ""}
          value={data.value!}
          color={data.color}
        />
      ))}
    </ul>
  );
}
