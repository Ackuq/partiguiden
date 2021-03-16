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
import parties from '../../utils/getParties';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import * as ROUTES from '../../lib/routes';

/* Can probably create React SVG components later on */

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentColor',
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(24),
  },
}));

const partyFactory = (partyAbbrev: string) =>
  function PartyIcon() {
    const classes = useStyles();
    return (
      <img
        className={classes.icon}
        src={`/static/images/party-logos/${partyAbbrev.toUpperCase()}.svg`}
      />
    );
  };

export default [
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
