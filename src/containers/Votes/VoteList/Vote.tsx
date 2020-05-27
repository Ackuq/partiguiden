import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import stripJsonComments from 'strip-json-comments';
import useStyles from './useStyles';
import { getAuthorityInfo } from '../../../utils';
import VoteResult from './VoteResult';
import { votingResult, VoteListEntry } from '../../../types/voting.d';
import { getVote } from '../../../lib/parlimentApi';
import { getMaxVotes, getVotes } from '../../../utils/votingHelpers';

interface Props {
  votering: VoteListEntry;
  classes: ReturnType<typeof useStyles>;
}

const Vote: React.FC<Props> = ({
  votering: { id, beteckning, tempbeteckning, titel, organ },
  classes,
}) => {
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState<votingResult>({ ja: [], nej: [], total: 0 });
  const [title, setTitle] = useState('');

  const authority = getAuthorityInfo(organ);
  const docId = `${id.substring(0, 2)}01${beteckning.split('p')[0]}`;

  let mounted = true;

  useEffect(() => {
    getVote(docId).then((res) => {
      const data = JSON.parse(stripJsonComments(res));

      const { dokumentstatus } = data;
      const { utskottsforslag } = dokumentstatus.dokutskottsforslag;
      const voteObject = Array.isArray(utskottsforslag)
        ? utskottsforslag[tempbeteckning - 1]
        : utskottsforslag;

      const { table } = voteObject.votering_sammanfattning_html;
      const tableRow = Array.isArray(table) ? table[table.length - 1].tr : table.tr;

      if (mounted && data) {
        setVotes(getMaxVotes(getVotes(tableRow)));
        setTitle(voteObject.rubrik);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return !loading && authority ? (
    <Card elevation={1} style={{ flex: 1 }}>
      <ButtonBase
        style={{ display: 'block' }}
        href={`/votering/${docId}/${tempbeteckning}`}
        component="a"
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          event.preventDefault();
          Router.push('/votering/[id]/[bet]', `/votering/${docId}/${tempbeteckning}`);
        }}
      >
        <CardHeader
          title={authority.desc}
          style={{ background: authority.color }}
          classes={{
            title: classes.headerTitle,
            root: classes.headerRoot,
          }}
        />
        <CardContent>
          <Typography
            variant="h3"
            color="textSecondary"
            align="left"
            gutterBottom
            classes={{ h3: classes.title }}
          >
            {titel}
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            align="left"
            classes={{ h6: classes.subtitle }}
          >
            {title}
          </Typography>
        </CardContent>

        <VoteResult votes={votes} classes={classes} />
      </ButtonBase>
    </Card>
  ) : null;
};

export default Vote;
