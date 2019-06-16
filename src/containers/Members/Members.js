import React, { useState, useEffect } from 'react';

import LoadCircle from '../../components/LoadCircle';
import FilterMembers from './components/FilterMembers';
import MemberList from './components/MemberList';
import getAllMembers from './lib/getAllMembers';
import { useStateValue } from '../../lib/stateProvider';

const Ledamoter = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState({});
  const { memberFilter } = useStateValue()[0];

  const url = `https://data.riksdagen.se/personlista/?utformat=json&parti=${memberFilter.party}`;

  useEffect(() => {
    getAllMembers({ url }).then(data => {
      const personer = data.personlista.person.sort((a, b) => {
        if (a.tilltalsnamn > b.tilltalsnamn) return 1;
        if (a.tilltalsnamn < b.tilltalsnamn) return -1;
        return 0;
      });

      setMembers(personer);
      setLoading(false);
    });
  }, [memberFilter]);

  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <div style={{ flex: 1 }}>{loading ? <LoadCircle /> : <MemberList members={members} />}</div>
      <FilterMembers />
    </div>
  );
};

export default Ledamoter;
