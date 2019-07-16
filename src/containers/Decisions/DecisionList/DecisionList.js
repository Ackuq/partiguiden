import React from 'react';
import { object, number } from 'prop-types';

import ParlimentList from '../../../components/ParlimentList';
import { apiLinks } from '../../../utils';
import Ad from '../../../components/Ad';
import Decision from './Decision';
import fetchDecisionList from './fetchDecisionList';
import useStyles from './useStyles';

const DecisionList = () => {
  const classes = useStyles();

  const url = ({ search, org, page }) =>
    `${apiLinks.riksdagenApi}/dokumentlista/?sok=${search}&doktyp=bet&org=${org.join(
      '&org='
    )}&dokstat=beslutade&sort=${search ? 'rel' : 'datum'}&sortorder=desc&utformat=json&p=${page}`;

  const extractData = res => res.beslut;

  const renderItem = ({ item, index }) => (
    <React.Fragment key={item.id + item.beteckning}>
      {!(index % 15) && <Ad canBeLower={false} />}
      <div>
        <Decision decision={item} classes={classes} />
      </div>
    </React.Fragment>
  );

  renderItem.propTypes = {
    item: object.isRequired,
    index: number.isRequired,
  };

  return (
    <ParlimentList
      extractData={extractData}
      url={url}
      renderItem={renderItem}
      fetchList={fetchDecisionList}
      baseUrl="/riksdagsbeslut"
    />
  );
};

export default DecisionList;
