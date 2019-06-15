import React, { useState, useEffect } from 'react';

import LoadCircle from '../../components/LoadCircle';
import MemberList from './components/MemberList';
import getAllMembers from './lib/getAllMembers';

const Ledamoter = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState({});

  useEffect(() => {
    getAllMembers().then(data => {
      const personer = data.personlista.person.sort((a, b) => {
        if (a.tilltalsnamn > b.tilltalsnamn) return 1;
        if (a.tilltalsnamn < b.tilltalsnamn) return -1;
        return 0;
      });

      setMembers(personer);
      setLoading(false);
    });
  }, []);

  return (
    <React.Fragment>{loading ? <LoadCircle /> : <MemberList members={members} />}</React.Fragment>
  );
};

export default Ledamoter;
