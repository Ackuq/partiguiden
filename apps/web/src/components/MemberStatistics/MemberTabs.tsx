import Box from "@mui/material/Box";
import Link from "next/link";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import * as ROUTES from "../../lib/routes";

const tabs = [
  { label: "Ledamöter", route: ROUTES.MEMBERS },
  { label: "Statistik riksmöte (riksdagsår)", route: ROUTES.MEMBER_STATS_YEAR },
  { label: "Statistik mandatperiod", route: ROUTES.MEMBER_STATS_PERIOD },
] as const;

interface Props {
  value: number;
}

const MembersTabs: React.FC<Props> = ({ value }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Tabs
      value={value}
      sx={{
        mb: "1rem",
      }}
      variant="scrollable"
      scrollButtons="auto"
    >
      {tabs.map((tab, index) => (
        <Link key={tab.route} href={tab.route} passHref legacyBehavior>
          <Tab value={index} label={tab.label} />
        </Link>
      ))}
    </Tabs>
  </Box>
);

export default MembersTabs;
