import React from 'react';

import ParlimentList from '../ParlimentList';
import Ad from '../Ad';
import Vote from './Vote';
import useStyles from './useStyles';
import { VoteListEntry } from '../../types/voting.d';
import { getVoteList } from '../../lib/parlimentApi';

interface ItemProps {
  item: VoteListEntry;
  index: number;
}

const Item = ({ item, index }: ItemProps) => {
  const classes = useStyles();

  return (
    <React.Fragment key={item.id + item.beteckning}>
      {!(index % 15) && <Ad />}
      <div>
        <Vote votering={item} classes={classes} />
      </div>
    </React.Fragment>
  );
};

const extractData = (res: { voteringar: VoteListEntry }) => res.voteringar;

const VoteList = () => (
  <ParlimentList
    fetchList={getVoteList}
    extractData={extractData}
    baseUrl="/voteringar"
    Item={Item}
  />
);

export default VoteList;
