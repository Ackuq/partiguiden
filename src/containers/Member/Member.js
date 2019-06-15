import React from 'react';

import { ProfilePicture } from './components';

const Member = ({ member }) => {
  console.log(member);
  return (
    <React.Fragment>
      <ProfilePicture
        src={member.bild_url_192}
        name={`${member.tilltalsnamn} ${member.efternamn}`}
      />
    </React.Fragment>
  );
};

export default Member;
