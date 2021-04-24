import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useStyles from './useStyles';
import { Member as MemberType } from '../../types/member';

import * as ROUTES from '../../lib/routes';

interface Props {
  member: MemberType;
  classes: ReturnType<typeof useStyles>;
}

const Member: React.FC<Props> = ({ member, classes }) => (
  <Link href={ROUTES.MEMBER} as={ROUTES.getMemberHref(member.id)} passHref>
    <a className={classes.memberCard}>
      <div className={classes.infoContainer}>
        <span className={classes.role}>{member.status}</span>

        <span className={classes.infoTitle}>Valkrets</span>
        <span>{member.district}</span>

        <span className={classes.infoTitle}>Ålder</span>
        <span>{member.age}</span>
      </div>
      <div
        className={classes.image}
        style={{
          background: `url(${member.pictureUrl})`,
          backgroundPositionX: '50%',
          backgroundPositionY: '25%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        {member.party !== '-' && (
          <Image
            width={50}
            height={50}
            layout="intrinsic"
            src={`/static/images/party-logos/${member.party.toUpperCase()}.png`}
            alt="Partisymbol"
          />
        )}
      </div>

      <div className={classes.nameContainer}>
        <span>
          {member.lastName}, {member.firstName}
        </span>
      </div>
    </a>
  </Link>
);

export default Member;
