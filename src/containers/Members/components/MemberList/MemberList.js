import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Member from '../Member';
import { useFilter } from '../../../../components/FilterContainer';

const chunkSize = 20;

const MemberList = ({ members }) => {
  const [memberList, setMemberList] = useState(members.slice(0, chunkSize));
  const { parties } = useFilter()[0];

  const updateMemberList = () => {
    if (memberList.length !== members.length) {
      setMemberList(prevState =>
        prevState.concat(members.slice(prevState.length, prevState.length + chunkSize))
      );
      setTimeout(updateMemberList, 0);
    }
  };

  const updateRoute = () => {
    const partyString = parties.length > 0 && `party=${parties.join('&party=')}`;
    let href = '';
    if (partyString) href += `?${partyString}`;
    Router.push(`/ledamoter${href}`);
  };

  useEffect(updateRoute, [parties]);

  useEffect(updateMemberList, []);

  return memberList.map(member => (
    <Member
      member={member}
      key={member.id}
      show={parties.length === 0 || parties.includes(member.parti)}
    />
  ));
};

MemberList.propTypes = {
  members: PropTypes.array.isRequired
};

export default MemberList;
