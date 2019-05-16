import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import CustomizedTick from './CustomizedTick';

import styles from '../../styles';

const createData = voting => [
  {
    name: 'S',
    Ja: voting.S.ja,
    Nej: voting.S.nej,
    Avstående: voting.S.avstaende,
    Frånvarande: voting.S.franvarande
  },
  {
    name: 'M',
    Ja: voting.M.ja,
    Nej: voting.M.nej,
    Avstående: voting.M.avstaende,
    Frånvarande: voting.M.franvarande
  },
  {
    name: 'SD',
    Ja: voting.SD.ja,
    Nej: voting.SD.nej,
    Avstående: voting.SD.avstaende,
    Frånvarande: voting.SD.franvarande
  },
  {
    name: 'C',
    Ja: voting.C.ja,
    Nej: voting.C.nej,
    Avstående: voting.C.avstaende,
    Frånvarande: voting.C.franvarande
  },
  {
    name: 'V',
    Ja: voting.V.ja,
    Nej: voting.V.nej,
    Avstående: voting.V.avstaende,
    Frånvarande: voting.V.franvarande
  },
  {
    name: 'KD',
    Ja: voting.KD.ja,
    Nej: voting.KD.nej,
    Avstående: voting.KD.avstaende,
    Frånvarande: voting.KD.franvarande
  },
  {
    name: 'L',
    Ja: voting.L.ja,
    Nej: voting.L.nej,
    Avstående: voting.L.avstaende,
    Frånvarande: voting.L.franvarande
  },
  {
    name: 'MP',
    Ja: voting.MP.ja,
    Nej: voting.MP.nej,
    Avstående: voting.MP.avstaende,
    Frånvarande: voting.MP.franvarande
  }
];

export default withStyles(styles)(
  class RostFordelning extends React.Component {
    state = {
      data: null,
      visible: false
    };

    componentDidMount() {
      const { voting } = this.props;
      this.setState({ data: createData(voting) });
    }

    render() {
      const { data, visible } = this.state;
      const { classes } = this.props;
      const btnclass = visible ? classes.arrowVisible : '';

      return (
        <div className={classes.contentContainer}>
          <ButtonBase
            onClick={() => this.setState({ visible: !visible })}
            classes={{ root: classes.button }}
          >
            <Typography variant="h5" color="inherit">
              Röstfördelning
            </Typography>
            <ArrowDownRounded
              classes={{
                root: `${classes.arrow} ${btnclass}`
              }}
            />
          </ButtonBase>
          <Collapse in={visible}>
            <ResponsiveContainer height={500} className={classes.chart}>
              {data ? (
                <BarChart data={data} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" tick={<CustomizedTick />} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Ja" stackId="a" fill="#16a085" />
                  <Bar dataKey="Nej" stackId="a" fill="#c0392b" />
                  <Bar dataKey="Avstående" stackId="a" fill="#7f8c8d" />
                  <Bar dataKey="Frånvarande" stackId="a" fill="#34495e" />
                </BarChart>
              ) : (
                <CircularProgress />
              )}
            </ResponsiveContainer>
          </Collapse>
        </div>
      );
    }
  }
);
