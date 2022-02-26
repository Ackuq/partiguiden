import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';

import { VoteAppendixItem } from '../../../types/voting';
import SectionDivider from '../SectionDivider';

interface Props {
  appendix: Array<VoteAppendixItem>;
}

const Appendix: React.FC<Props> = ({ appendix }) => {
  const theme = useTheme();
  return (
    <>
      <SectionDivider />
      <Typography variant="h4" color="textSecondary" component="span" gutterBottom>
        Bilaga
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {appendix.map((item) => (
          <Link
            href={item.fil_url}
            key={item.fil_url}
            target="_blank"
            rel="noopener"
            variant="body1"
            color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'}
          >
            {item.titel} {item.dok_id}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Appendix;
