import { Paper, styled, Typography, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import moment from 'moment';
import { DefaultTooltipContent } from '../types/recharts.d';
import PartySymbolTick from '../components/PartySymbolTick';
import { getAverage, getMonthlyAverage, getWithin, PollDetails } from '../lib/polls';
import { partyAbbrev } from '../types/party';
import { Polls as PollsType } from '../types/polls';
import { partiesMap } from '../utils/getParties';
import { grey } from '@material-ui/core/colors';

interface Props {
  polls: PollsType;
}

const today = moment();
const fourYearsAgo = moment().subtract(4, 'years');

const HistoricPolls: React.FC<Props> = ({ polls }) => {
  useEffect(() => {
    const average = getMonthlyAverage(
      getWithin(polls, fourYearsAgo.toDate(), today.toDate(), true)
    );
    console.log(average);
  }, []);

  return <></>;
};

export default HistoricPolls;
