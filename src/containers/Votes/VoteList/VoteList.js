import React from 'react';
import { object, number } from 'prop-types';

import ParlimentList from '../../../components/ParlimentList';
import { apiLinks } from '../../../utils';
import Ad from '../../../components/Ad';
import Vote from './Vote';
import fetchVoteList from './fetchVoteList';
import useStyles from './useStyles';

const VoteList = () => {
  const classes = useStyles();

  const url = ({ search, org, page }) =>
    `${apiLinks.riksdagenApi}/dokumentlista/?sok=${search}&doktyp=votering&org=${org.join(
      '&org='
    )}&sort=${search ? 'rel' : 'datum'}&sortorder=desc&utformat=json&a=s&p=${page}`;

  const extractData = res => res.voteringar;
  const renderItem = ({ item, index }) => (
    <React.Fragment key={item.id + item.beteckning}>
      {!(index % 15) && <Ad canBeLower={false} />}
      <div>
        <Vote votering={item} classes={classes} />
      </div>
    </React.Fragment>
  );

  renderItem.propTypes = {
    item: object.isRequired,
    index: number.isRequired,
  };

  return (
    <ParlimentList
      fetchList={fetchVoteList}
      extractData={extractData}
      url={url}
      baseUrl="/voteringar"
      renderItem={renderItem}
    />
  );
};

export default VoteList;
