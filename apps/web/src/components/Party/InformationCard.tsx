import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

import type { PartyData } from "../../types/party";

const Biography = styled("div")`
  p {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`;

const InformationDivider = styled(Divider)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const InformationCardWrapper = styled(Paper)`
  padding: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

interface Props {
  party: PartyData;
}

const InformationCard: React.FC<Props> = ({ party }) => (
  <InformationCardWrapper>
    <div>
      <Typography variant="h5">Hemsida</Typography>
      <Typography>
        <Link href={party.website} rel="noopener" target="_blank">
          {party.website}
        </Link>
      </Typography>
    </div>
    <InformationDivider />
    <div>
      <Typography variant="h5">Ideologi</Typography>
      <Typography>{party.ideology.join(", ")}</Typography>
      <Typography component="p" variant="caption">
        Källa:{" "}
        <Link href="https://www.wikipedia.org/" rel="noopener" target="_blank">
          https://www.wikipedia.org/
        </Link>
      </Typography>
    </div>
    <InformationDivider />
    <div>
      <Typography variant="h5">Biografi</Typography>
      <Typography component="div" variant="body2">
        <Biography dangerouslySetInnerHTML={{ __html: party.abstract }} />
      </Typography>
      <Typography component="p" variant="caption">
        Källa:{" "}
        <Link href="https://www.wikipedia.org/" rel="noopener" target="_blank">
          https://www.wikipedia.org/
        </Link>
      </Typography>
    </div>
  </InformationCardWrapper>
);

export default InformationCard;
