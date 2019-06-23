import React, { useState, useEffect } from 'react';

import { apiLinks, fetchJSON } from '../../utils';
import LoadCircle from '../../components/LoadCircle';
import FilterMembers from './components/FilterMembers';
import MemberList from './components/MemberList';

const Ledamoter = () => {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState({});

  const url = `${apiLinks.partiguidenApi}/members`;

  useEffect(() => {
    fetchJSON(url).then(data => {
      const personer = data.sort((a, b) => {
        if (a.namn > b.namn) return 1;
        if (a.namn < b.namn) return -1;
        return 0;
      });

      setMembers(personer);
      setLoading(false);
    });
  }, []);

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
