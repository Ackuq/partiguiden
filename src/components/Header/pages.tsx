import React from 'react';
import {
  Home,
  Note,
  Group,
  GavelRounded,
  HowToVoteRounded,
  InfoRounded,
  Person,
  Poll,
} from '@material-ui/icons';
import Image from 'next/image';
import parties from '../../utils/getParties';
import * as ROUTES from '../../lib/routes';
import { PARTY_LOGOS_LOW_RES } from '../../assets/logos';
import { PartyAbbreviation } from '../../utils/parties';

const partyFactory = (partyAbbrev: string) =>
  function PartyIcon() {
    return (
      <Image
        src={PARTY_LOGOS_LOW_RES[partyAbbrev.toUpperCase() as PartyAbbreviation]}
        layout="fixed"
        width="30%"
        height="30%"
        quality={100}
        alt={`${partyAbbrev} logo`}
      />
    );
  };

const PAGES = [
  { href: ROUTES.INDEX, title: 'Hem', Icon: Home },
  {
    href: ROUTES.STANDPOINTS,
    title: 'Partiernas Ståndpunkter',
    Icon: Note,
    associated: [ROUTES.STANDPOINT],
  },
  {
    href: ROUTES.PARTY,
    title: 'Partierna',
    subPages: parties.map((party) => ({
      title: party.name,
      id: party.letter.toLocaleLowerCase(),
      Icon: partyFactory(party.letter.toUpperCase()),
    })),
    Icon: Group,
  },
  { href: ROUTES.DECISIONS, title: 'Riksdagsbeslut', Icon: GavelRounded },
  { href: ROUTES.VOTES, title: 'Voteringar', Icon: HowToVoteRounded, associated: [ROUTES.VOTE] },
  { href: ROUTES.MEMBERS, title: 'Ledamöter', Icon: Person, associated: [ROUTES.MEMBER] },
  {
    href: ROUTES.POLLS,
    title: 'Opinionsundersökningar',
    Icon: Poll,
    associated: [],
  },
  { href: ROUTES.ABOUT_US, title: 'Om oss', Icon: InfoRounded },
];

export default PAGES;
