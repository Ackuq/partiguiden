import dynamic from 'next/dynamic';

import { styled } from '@mui/material/styles';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import LoadCircle from '../components/LoadCircle';
import SectionDivider from '../components/VoteInfo/SectionDivider';

import { useDebate } from '../hooks/parliamentHooks';

const Statements = dynamic(() => import('../components/Debate/Statements'));

const IFrame = styled('iframe')(
  ({ theme }) => `
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: none;
  ${theme.breakpoints.down('sm')} {
    transform: scale(0.625);
    transform-origin: 0 0;
    height: 160%;
    width: 160%;
  }
`
);

const createWebTVLink = (id: string) => {
  return `https://www.riksdagen.se/views/pages/embedpage.aspx?did=${id}`;
};

interface Props {
  id: string;
}

const Debate: React.FC<Props> = ({ id }) => {
  const debate = useDebate(id);

  if (!debate) {
    return <LoadCircle />;
  }

  const webTVLink = createWebTVLink(id);

  return (
    <>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="caption">
            {debate.debateName} {debate.date}
          </Typography>
          <Typography variant="h3">{debate.title}</Typography>
          <SectionDivider />
          <Typography variant="h4" gutterBottom align="center">
            Inspelning från kammaren
          </Typography>
          <Container disableGutters maxWidth="md">
            <Box
              width="100%"
              paddingTop="56.25%" // 16:9 Aspect Ratio (divide 9 by 16 = 0.5625)
              position="relative"
            >
              <IFrame
                src={webTVLink}
                width="100%"
                height="100%"
                allowFullScreen={true}
                title={`${debate.debateName} ${debate.date} från Riksdagen om ${debate.title}`}
              />
            </Box>
          </Container>
          {debate.statements.length > 0 && (
            <>
              <SectionDivider />
              <Typography variant="h4" align="center" gutterBottom>
                Debatt i text
              </Typography>
              <Statements debate={debate} />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Debate;
