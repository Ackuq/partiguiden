import React from 'react';

import ParlimentList from '../../../components/ParlimentList';
import { apiLinks } from '../../../utils';
import Ad from '../../../components/Ad';
import Decision from './Decision';
import fetchDecisionList from './fetchDecisionList';
import useStyles from './useStyles';
import { Decision as DecisionType } from '../../../types/decision.d';

interface UrlProps {
  search: string;
  org: Array<string>;
  page: number;
}

const url = ({ search, org, page }: UrlProps) =>
  `${apiLinks.riksdagenApi}/dokumentlista/?sok=${search}&doktyp=bet&org=${org.join(
    '&org='
  )}&dokstat=beslutade&sort=${search ? 'rel' : 'datum'}&sortorder=desc&utformat=json&p=${page}`;

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
      url={url}
      Item={Item}
      fetchList={fetchDecisionList}
      baseUrl="/riksdagsbeslut"
    />
  );
};

export default DecisionList;
