import Typography from '@mui/material/Typography';

import SectionDivider from '../SectionDivider';

interface Props {
  decision: string;
  description: string;
}

const Decision: React.FC<Props> = ({ decision, description }) => (
  <>
    <Typography variant="h4" color="textSecondary" component="span" gutterBottom>
      Beslut
    </Typography>
    <Typography variant="body1" gutterBottom>
      {decision}
    </Typography>
    <SectionDivider />
    <Typography variant="h4" color="textSecondary" component="span">
      Beslut i korthet
    </Typography>
    <div dangerouslySetInnerHTML={{ __html: description }} />
  </>
);

export default Decision;
