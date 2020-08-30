import React from 'react';
import {
  Home,
  Note,
  Group,
  GavelRounded,
  HowToVoteRounded,
  InfoRounded,
  Person,
} from '@material-ui/icons';
import parties from '../../utils/getParties';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

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
  { href: '/', title: 'Hem', Icon: Home },
  {
    href: '/partiernas-standpunkter',
    title: 'Partiernas Ståndpunkter',
    Icon: Note,
  },
  {
    href: '/parti/[party]',
    title: 'Partierna',
    subPages: parties.map((party) => ({
      title: party.name,
      id: party.letter.toLocaleLowerCase(),
      Icon: partyFactory(party.letter.toUpperCase()),
    })),
    Icon: Group,
  },
  { href: '/riksdagsbeslut', title: 'Riksdagsbeslut', Icon: GavelRounded },
  { href: '/voteringar', title: 'Voteringar', Icon: HowToVoteRounded },
  { href: '/ledamoter', title: 'Ledamöter', Icon: Person },
  { href: '/om-oss', title: 'Om oss', Icon: InfoRounded },
];
