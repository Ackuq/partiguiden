import { twMerge } from "tailwind-merge";

import { Card } from "@components/common/card";
import type { MemberDetailedResponse } from "@lib/api/member/types";

interface StatisticsCardProps {
  value: string;
  description: string;
  className?: string;
}
function StatisticsCard({
  value,
  description,
  className,
}: StatisticsCardProps) {
  return (
    <Card className={twMerge("flex-1 text-center", className)}>
      <div className="text-lg">{value}</div>
      <div className="text-sm">{description}</div>
    </Card>
  );
}

interface Props {
  absence: MemberDetailedResponse["absence"];
  documentCount: number;
}

export default function Statistics({ absence, documentCount }: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      {absence.mandatePeriod.value !== undefined && (
        <StatisticsCard
          value={`${absence.mandatePeriod.value}%`}
          description={`Voteringsnärvaro mandatperiod ${absence.mandatePeriod.description}`}
        />
      )}
      {absence.parliamentYear.value !== undefined && (
        <StatisticsCard
          value={`${absence.parliamentYear.value}%`}
          description={`Voteringsnärvaro riksmöte ${absence.parliamentYear.description}`}
          className="xs:basis-full sm:basis-0"
        />
      )}
      <StatisticsCard
        value={documentCount.toString()}
        description="Dokument"
        className="basis-full sm:basis-0"
      />
    </div>
  );
}
