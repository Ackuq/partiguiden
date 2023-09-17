import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ResponsiveAd } from "../components/Ad";
import type { SubjectListEntry } from "../types/subjects";
import Featured from "../components/Featured";

interface Props {
  popular: Array<SubjectListEntry>;
}

const FrontPage: React.FC<Props> = ({ popular }) => (
  <Stack spacing={3}>
    <Card>
      <CardContent>
        <Typography variant="h4" paragraph align="center">
          Vilket parti ska man rösta på?
        </Typography>
        <Typography variant="body1" paragraph>
          Vilket parti ska man rösta på? Och vad tycker partierna egentligen? På
          Partiguiden kan du läsa om vad partierna tycker enligt sina
          partiprogram och samt se hur de röstar i riksdagsvoteringar.
        </Typography>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <Typography variant="h5" paragraph align="center">
          Mest besökta ämnen de senaste 30 dagarna
        </Typography>
        <Featured popular={popular} />
      </CardContent>
    </Card>
    <ResponsiveAd />
  </Stack>
);

export default FrontPage;
