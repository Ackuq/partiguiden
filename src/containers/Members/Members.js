import React, { useState, useEffect, useContext } from 'react';

import ApiContext from '../../lib/ApiContext';
import LoadCircle from '../../components/LoadCircle';
import FilterMembers from './components/FilterMembers';
import MemberList from './components/MemberList';
import { fetchJSON } from '../../utils';

const Ledamoter = () => {
  const { partiguidenApi } = useContext(ApiContext);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState({});

  const url = `${partiguidenApi}/members`;

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
