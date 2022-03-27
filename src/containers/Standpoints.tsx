import Divider from '@mui/material/Divider';
import MUILink from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import { PartyAbbreviation } from '../utils/parties';
import { RelatedSubject, StandpointsMap } from '../types/subjects';
import { ResponsiveAd } from '../components/Ad';
import { STANDPOINT, getStandpointHref } from '../lib/routes';
import { partiesMap } from '../utils/getParties';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const PartyStandpoints = dynamic(() => import('../components/PartyStandpoints/PartyStandpoints'));

const ContentDivider = styled(Divider)`
  margin-top: 5rem;
  margin-bottom: 1rem;
`;

interface Props {
  standpoints: StandpointsMap;
  relatedSubjects: Array<RelatedSubject>;
}

const Subject: React.FC<Props> = ({ standpoints, relatedSubjects }) => (
  <>
    {Object.keys(standpoints).map((party) => (
      <PartyStandpoints
        key={party}
        party={partiesMap[party as PartyAbbreviation]}
        standpoints={standpoints[party as PartyAbbreviation]}
      />
    ))}

    <ResponsiveAd />

    {relatedSubjects.length > 0 && (
      <>
        <ContentDivider />
        <Typography gutterBottom variant="h5" color="primary">
          Se även
        </Typography>
        {relatedSubjects.map(
          (relatedSubject): JSX.Element => (
            <Link
              key={relatedSubject.id}
              href={STANDPOINT}
              as={getStandpointHref(relatedSubject.id)}
              passHref
            >
              <MUILink variant="body1" display="block" key={relatedSubject.id}>
                {relatedSubject.name}
              </MUILink>
            </Link>
          )
        )}
      </>
    )}
  </>
);

export default Subject;
