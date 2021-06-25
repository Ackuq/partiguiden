import React from 'react';
import { Link as MUILink, Typography } from '@material-ui/core';

import Link from 'next/link';
import PartyStandpoints from '../components/PartyStandpoints';
import { PartyAbbreviation } from '../utils/parties';
import { RelatedSubject, StandpointsMap } from '../types/subjects';
import { partiesMap } from '../utils/getParties';
import { getStandpointHref, STANDPOINT } from '../lib/routes';

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
              <MUILink display="block" key={relatedSubject.id}>
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
