import Image from 'next/image';
import Link from 'next/link';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography, { TypographyProps } from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import * as ROUTES from '../../lib/routes';
import { PARTY_LOGOS_LOW_RES } from '../../assets/logos';

import type {
  AbsenceLeaderboard as AbsenceLeaderboardType,
  AbsencePeriod,
  MemberAbsenceResponse,
} from '../../types/member';

const ImageContainer = styled('div')<{ url: string }>`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: url(${({ url }) => url});
  background-position-x: 50%;
  background-position-y: 25%;
  background-repeat: no-repeat;
  background-size: cover;
`;

interface MemberListEntryProps {
  member: MemberAbsenceResponse;
  percentageColor: TypographyProps['color'];
}

const MemberListEntry: React.FC<MemberListEntryProps> = ({ member, percentageColor }) => {
  return (
    <Link href={ROUTES.MEMBER} as={ROUTES.getMemberHref(member.id)} passHref legacyBehavior>
      <Stack
        component="a"
        direction="row"
        spacing={1}
        marginY={1}
        color="inherit"
        sx={(theme) => ({
          textDecoration: 'none',
          margin: 0,
          padding: '0.5rem 1rem',
          transition: 'box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
          '&:hover': {
            boxShadow: theme.shadows[10],
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
          },
        })}
      >
        <ImageContainer url={member.pictureUrl}>
          {member.party !== '-' && (
            <Image
              width={25}
              height={25}
              src={
                PARTY_LOGOS_LOW_RES[member.party.toUpperCase() as keyof typeof PARTY_LOGOS_LOW_RES]
              }
              alt="Partisymbol"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          )}
        </ImageContainer>

        <div>
          <div>
            {member.lastName}, {member.firstName}
          </div>
          <div>Valkrets: {member.district}</div>
          <div>Ålder: {member.age}</div>
        </div>
        <Typography
          align="right"
          display="flex"
          flex={1}
          justifyContent="flex-end"
          alignItems="center"
          variant="h6"
          color={percentageColor}
        >
          {member.absence?.toFixed(2)}%
        </Typography>
      </Stack>
    </Link>
  );
};

interface AbsenceLeaderboardContentProps {
  title: string;
  memberList: MemberAbsenceResponse[];
  percentageColor: TypographyProps['color'];
  period: AbsencePeriod;
  description: string;
}

const AbsenceLeaderboardContent: React.FC<AbsenceLeaderboardContentProps> = ({
  title,
  memberList,
  percentageColor,
  period,
  description,
}) => (
  <Card>
    <CardHeader
      title={title}
      subheader={`För ${period} ${description}`}
      sx={{ backgroundColor: (theme) => theme.palette.primary.main, color: 'white' }}
    />

    {memberList.map((member) => (
      <>
        <Divider />
        <MemberListEntry key={member.id} member={member} percentageColor={percentageColor} />
      </>
    ))}
  </Card>
);

interface Props {
  absenceLeaderboard: AbsenceLeaderboardType;
  period: AbsencePeriod;
  description: string;
}

const AbsenceLeaderboard: React.FC<Props> = ({ absenceLeaderboard, period, description }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Voteringsnärvaro för {period} {description}
      </Typography>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
        <AbsenceLeaderboardContent
          title="Ledamöter med minst voteringsnärvaro"
          memberList={absenceLeaderboard.mostAbsence}
          percentageColor="error"
          period={period}
          description={description}
        />
        <AbsenceLeaderboardContent
          title="Ledamöter med mest voteringsnärvaro"
          memberList={absenceLeaderboard.leastAbsence}
          percentageColor="primary"
          period={period}
          description={description}
        />
      </Stack>
    </>
  );
};

export default AbsenceLeaderboard;
