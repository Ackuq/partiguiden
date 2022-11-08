import Image from 'next/image';
import Link from 'next/link';

import { Theme } from '@emotion/react';
import { styled } from '@mui/material/styles';

import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';

import * as ROUTES from '../../lib/routes';
import { DebateEntry } from '../../types/debate';
import { MemberResponse } from '../../types/member';
import { PARTY_LOGOS_LOW_RES } from '../../assets/logos';
import { PartyAbbreviation } from '../../utils/parties';

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
  flex: 1;
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
    width: 50px;
    height: 50px;
  }
  ${theme.breakpoints.between('sm', 'md')} {
    width: 75px;
    height: 75px;
  }
  ${theme.breakpoints.up('md')} {
    width: 90px;
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

const SpeakerImage: React.FC<{ speaker: MemberResponse; primary: boolean }> = ({
  speaker,
  primary,
}) => (
  <Link href={ROUTES.MEMBER} as={ROUTES.getMemberHref(speaker.id)} passHref legacyBehavior>
    <Box
      component="a"
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
                position: 'relative',
                width: '37.5%',
                height: '37.5%',
              }}
            >
              <Image
                src={PARTY_LOGOS_LOW_RES[speaker.party.toUpperCase() as PartyAbbreviation]}
                fill
                alt="Partisymbol"
              />
            </Box>
          )}
        </>
      </ImageContainer>
    </Box>
  </Link>
);

interface StatementProps {
  debate: DebateEntry;
}

const Statements: React.FC<StatementProps> = ({ debate }) => {
  return (
    <>
      {debate.statements.map((statement) => {
        const speaker = debate.speakers[statement.speech.speakerId];
        const primary = statement.personId === debate.participants?.sender?.id;
        return (
          <Box display="flex" key={statement.number}>
            {!primary && <SpeakerImage speaker={speaker} primary={primary} />}
            <ChatBubble primary={primary}>
              <Link
                href={ROUTES.MEMBER}
                as={ROUTES.getMemberHref(speaker.id)}
                passHref
                legacyBehavior
              >
                <Typography
                  component="a"
                  variant="button"
                  color="primary"
                  display="flex"
                  justifyContent={primary ? 'flex-end' : 'flex-start'}
                >
                  {speaker.firstName} {speaker.lastName}
                </Typography>
              </Link>
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

export default Statements;
