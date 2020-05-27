import React from 'react';

import ParlimentList from '../../../components/ParlimentList';
import Ad from '../../../components/Ad';
import Decision from './Decision';
import useStyles from './useStyles';
import { Decision as DecisionType } from '../../../types/decision.d';
import { getDecisionList } from '../../../lib/parlimentApi';

const extractData = (res: any) => res.beslut;

interface ItemProps {
  item: DecisionType;
  index: number;
}

const Item: React.FC<ItemProps> = ({ item, index }) => {
  const classes = useStyles();

  return (
    <React.Fragment key={item.id + item.beteckning}>
      {!(index % 15) && <Ad />}
      <div>
        <Decision decision={item} classes={classes} />
      </div>
    </React.Fragment>
  );
};

const DecisionList: React.FC = () => {
  return (
    <ParlimentList
      extractData={extractData}
      Item={Item}
      fetchList={getDecisionList}
      baseUrl="/riksdagsbeslut"
    />
  );
};

export default DecisionList;
