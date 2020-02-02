import React from 'react';

import ParlimentList from '../../../components/ParlimentList';
import { apiLinks } from '../../../utils';
import Ad from '../../../components/Ad';
import Vote from './Vote';
import fetchVoteList from './fetchVoteList';
import useStyles from './useStyles';

const Item = ({ item, index }) => {
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

const extractData = res => res.voteringar;

const url = ({ search, org, page }) =>
  `${apiLinks.riksdagenApi}/dokumentlista/?sok=${search}&doktyp=votering&org=${org.join(
    '&org='
  )}&sort=${search ? 'rel' : 'datum'}&sortorder=desc&utformat=json&a=s&p=${page}`;

const VoteList = () => (
  <ParlimentList
    fetchList={fetchVoteList}
    extractData={extractData}
    url={url}
    baseUrl="/voteringar"
    Item={Item}
  />
);

export default VoteList;
