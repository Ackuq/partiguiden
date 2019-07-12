import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const Member = ({ member, classes }) => (
  <Link href="/ledamot/[id]" as={`/ledamot/${member.id}`}>
    <a href={`/ledamot/${member.id}`} className={classes.memberCard}>
      <div className={classes.infoContainer}>
        <span className={classes.role}>{member.status}</span>

        <span className={classes.infoTitle}>Valkrets</span>
        <span>{member.constituency}</span>

        <span className={classes.infoTitle}>Ålder</span>
        <span>{member.age}</span>
      </div>
      <div
        alt="Bild på ledamot"
        className={classes.image}
        style={{ background: `url(${member.picture}) 50% 25% no-repeat` }}
      >
        {member.party !== '-' && (
          <img
            className={classes.partyLogo}
            width={65}
            height={65}
            src={`../../static/images/party-logos/${member.party.toUpperCase()}.svg`}
            alt="Partisymbol"
          />
        )}
      </div>

      <div className={classes.nameContainer}>
        <span>{member.name}</span>
      </div>
    </a>
  </Link>
);

Member.propTypes = {
  member: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Member;
