import Image from 'next/image';

import { Theme } from '@emotion/react';
import { styled } from '@mui/material/styles';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import LoadCircle from '../components/LoadCircle';
import SectionDivider from '../components/VoteInfo/SectionDivider';

import { DebateEntry } from '../types/debate';
import { MemberResponse } from '../types/member';
import { PARTY_LOGOS_LOW_RES } from '../assets/logos';
import { PartyAbbreviation } from '../utils/parties';

import { useDebate } from '../hooks/parliamentHooks';

const arrowWidth = '1.125em';

const getColor = ({ theme, primary }: { theme: Theme; primary: boolean }) => {
  if (primary) {
    return theme.palette.primary.main;
  }
  return theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300];
};

const ChatBubble = styled('div', { shouldForwardProp: (prop) => prop !== 'primary' })<{
  primary: boolean;
}>(
  ({ theme, primary }) => `
  position: relative;
  background: ${getColor({ theme, primary })};
  color: ${primary ? theme.palette.primary.contrastText : theme.palette.text.primary};
  border-radius: 0.4em;
  padding: 0.25rem 0.5rem;
  ${primary ? 'margin-right' : 'margin-left'}: ${arrowWidth};
  margin-bottom: 1rem;
  z-index: 99;
  &:after {
    content: '';
    position: absolute;
    ${primary ? 'right: 0' : 'left: 0'};
    ${theme.breakpoints.down('sm')} {
      top: 25px;
    }
    ${theme.breakpoints.between('sm', 'md')} {
      top: 37.5px;
    }
    ${theme.breakpoints.up('md')} {
      top: 40px;
    }
    width: 0;
    height: 0;
    border: ${arrowWidth} solid transparent;
    border-top-color: ${getColor({ theme, primary })};
    ${primary ? 'margin-right' : 'margin-left'}: -${arrowWidth};
    z-index: -9;
  }
`
);

const ImageContainer = styled('div')<{ url: string }>(
  ({ theme, url }) => `
  ${theme.breakpoints.down('sm')} {
    min-width: 50px;
    height: 50px;
  }
  ${theme.breakpoints.between('sm', 'md')} {
    min-width: 75px;
    height: 75px;
  }
  ${theme.breakpoints.up('md')} {
    min-width: 90px;
    height: 90px;
  }
  border-radius: 50%;
  background: url(${url});
  background-position-x: 50%;
  background-position-y: 25%;
  background-repeat: no-repeat;
  background-size: cover;
`
);

// We need to scale down the iframe on smaller devides to avoid the huge banner that the parliament has on embeded integrations
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

interface StatementProps {
  debate: DebateEntry;
}

const SpeakerImage: React.FC<{ speaker: MemberResponse; primary: boolean }> = ({
  speaker,
  primary,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: primary ? '0.5rem' : '0',
        marginRight: primary ? '0' : '0.5rem',
      }}
    >
      <ImageContainer url={speaker.pictureUrlLowRes}>
        <>
          {speaker.party !== '-' && (
            <Box
              sx={{
                width: '37.5%',
                height: '37.5%',
              }}
            >
              <Image
                src={PARTY_LOGOS_LOW_RES[speaker.party.toUpperCase() as PartyAbbreviation]}
                alt="Partisymbol"
              />
            </Box>
          )}
        </>
      </ImageContainer>
    </Box>
  );
};

const Statements: React.FC<StatementProps> = ({ debate }) => {
  return (
    <>
      {debate.statements.map((statement) => {
        const speaker = debate.speakers[statement.personId];
        const primary = statement.personId === debate.participants?.sender?.id;
        return (
          <Box display="flex" key={statement.number}>
            {!primary && <SpeakerImage speaker={speaker} primary={primary} />}
            <ChatBubble primary={primary}>
              <Typography
                variant="button"
                display="flex"
                justifyContent={primary ? 'flex-end' : 'flex-start'}
              >
                {speaker.firstName} {speaker.lastName}
              </Typography>
              <Typography variant="caption" sx={{ '& p': { marginTop: 0 } }}>
                <div dangerouslySetInnerHTML={{ __html: statement.speech.text }} />
              </Typography>
              <Typography
                variant="button"
                display="flex"
                justifyContent={primary ? 'flex-end' : 'flex-start'}
              >
                {statement.dateTime}
              </Typography>
            </ChatBubble>
            {primary && <SpeakerImage speaker={speaker} primary={primary} />}
          </Box>
        );
      })}
    </>
  );
};

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
          <SectionDivider />
          <Typography variant="h4" align="center" gutterBottom>
            Debatt i text
          </Typography>
          <Statements debate={debate} />
        </CardContent>
      </Card>
    </>
  );
};

export default Debate;
