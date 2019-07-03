import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { object } from 'prop-types';

import reducer from './reducer';
import { FilterProvider } from '../../components/FilterContainer';
import { apiLinks, fetchJSON } from '../../utils';
import LoadCircle from '../../components/LoadCircle';
import FilterMembers from './components/FilterMembers';
import MemberList from './components/MemberList';

const Ledamoter = ({ router }) => {
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

  let initialParties = [];
  if (router.query.party) {
    initialParties = Array.isArray(router.query.party) ? router.query.party : [router.query.party];
  }

  return (
    <FilterProvider initialState={{ parties: initialParties }} reducer={reducer}>
      <div
        style={{
          display: 'flex'
        }}
      >
        <div style={{ flex: 1 }}>{loading ? <LoadCircle /> : <MemberList members={members} />}</div>
        <FilterMembers />
      </div>
    </FilterProvider>
  );
};

Ledamoter.propTypes = {
  router: object.isRequired
};

export default withRouter(Ledamoter);
