import React, { useState } from "react";

import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";

import type { LegendProps } from "recharts";
import {
  Brush,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { MonthlyAverage } from "../../lib/polls";

import { ChartContainer, PollCard } from "./utils";
import type { PartyAbbreviation } from "../../utils/parties";
import { partyAbbreviations } from "../../utils/parties";
import { partiesMap } from "../../utils/getParties";
import tooltipProps from "../../utils/tooltipProps";

interface Props {
  historicPolls: MonthlyAverage;
}

const HistoricPolls: React.FC<Props> = ({ historicPolls }) => {
  const [hide, setHide] = useState<Array<PartyAbbreviation>>([]);
  const theme = useTheme();

  const hideParty = (party: PartyAbbreviation) => {
    setHide((prev) => [...prev, party]);
  };

  const showParty = (party: PartyAbbreviation) => {
    setHide((prev) => prev.filter((p) => p !== party));
  };

  const onClick: LegendProps["onClick"] = (data) => {
    const party = data.value;
    if (hide.includes(party)) {
      showParty(party);
    } else {
      hideParty(party);
    }
  };

  return (
    <PollCard>
      <Typography variant="h5" align="center">
        Historiskt genomsnitt (senaste 4 åren)
      </Typography>
      <ChartContainer height={500}>
        <LineChart data={historicPolls}>
          <XAxis type="category" dataKey="date" />
          <YAxis type="number" unit="%" />
          <Tooltip {...tooltipProps(theme)} />
          <Legend
            wrapperStyle={{ marginLeft: 30, bottom: -5 }}
            fill="#000"
            onClick={onClick}
          />
          {partyAbbreviations.map((party) => (
            <Line
              key={party}
              dataKey={party}
              hide={hide.includes(party)}
              stroke={partiesMap[party].color}
              dot={false}
              unit="%"
            />
          ))}
          <Brush
            dataKey="date"
            fill={
              theme.palette.mode === "dark" ? theme.palette.grey[700] : "white"
            }
            stroke={
              theme.palette.mode === "dark"
                ? theme.palette.grey[900]
                : theme.palette.grey[700]
            }
            style={{ marginBottom: 20, color: "white" }}
          />
        </LineChart>
      </ChartContainer>
    </PollCard>
  );
};

export default HistoricPolls;
