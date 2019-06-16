import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';

import { ProfilePicture, Information } from './components';
import { getMemberDocuments } from './lib';

const Member = ({ member }) => {
  const [documents, setDocuments] = useState({ count: null, documents: null });

  const url = `https://data.riksdagen.se/dokumentlista/?avd=dokument&sort=datum&sortorder=datum&utformat=json&iid=${
    member.intressent_id
  }`;

  useEffect(() => {
    getMemberDocuments({ url }).then(res =>
      setDocuments({ count: res.count, documents: res.documents })
    );
  }, []);

  return (
    <React.Fragment>
      <ProfilePicture
        src={member.bild_url_192}
        name={`${member.tilltalsnamn} ${member.efternamn}`}
        status={member.status}
      />
      <Container>
        <Information id={member.intressent_id} documentCount={documents.count} />
      </Container>
    </React.Fragment>
  );
};

export default Member;
