import React, { useCallback, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';

import { MemberList as MemberListType } from '../../types/member';
import { PartyAbbreviation } from '../../utils/parties';
import { ResponsiveAd } from '../Ad';
import Member from './Member';

interface Props {
  filter: {
    search: string;
    parties: Array<PartyAbbreviation>;
  };
  members: MemberListType;
}

const MEMBERS_PER_PAGE = 24;

const MemberList: React.FC<Props> = ({ members, filter }) => {
  const [filteredMembers, setFilteredMembers] = useState(members);
  const [membersInView, setMembersInView] = useState(members.slice(0, MEMBERS_PER_PAGE));

  const handleScroll = useCallback(() => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 20;

    if (bottom && membersInView.length < filteredMembers.length) {
      setMembersInView((prevState) => {
        return [
          ...prevState,
          ...filteredMembers.slice(
            prevState.length,
            prevState.length + Math.min(filteredMembers.length - prevState.length, MEMBERS_PER_PAGE)
          ),
        ];
      });
    }
  }, [filteredMembers, membersInView.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const newMembers = members.filter((member) => {
      const inParty = filter.parties.length
        ? filter.parties.includes(member.party as PartyAbbreviation)
        : true;
      const inSearch = `${member.firstName} ${member.lastName}`
        .toLowerCase()
        .includes(filter.search.toLowerCase());
      return inParty && inSearch;
    });
    setFilteredMembers(newMembers);
    setMembersInView(newMembers.slice(0, Math.min(MEMBERS_PER_PAGE, newMembers.length)));
  }, [filter, members]);

  return (
    <>
      {membersInView.map((member, index) => (
        <React.Fragment key={member.id}>
          {index % 24 === 0 && (
            <Grid item xs={12}>
              <ResponsiveAd />
            </Grid>
          )}
          <Grid item xs={12} md={6} xl={4}>
            <Member member={member} />
          </Grid>
        </React.Fragment>
      ))}
    </>
  );
};

export default MemberList;
