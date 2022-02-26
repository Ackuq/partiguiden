import Typography from '@mui/material/Typography';
import MUILink from '@mui/material/Link';
import Divider from '@mui/material/Divider';

import { styled } from '@mui/material/styles';

import Link from 'next/link';
import PartyStandpoints from '../components/PartyStandpoints';
import { PartyAbbreviation } from '../utils/parties';
import { RelatedSubject, StandpointsMap } from '../types/subjects';
import { partiesMap } from '../utils/getParties';
import { getStandpointHref, STANDPOINT } from '../lib/routes';

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
