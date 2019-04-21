import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const createData = voting => [
  { name: "Ja", value: parseInt(voting.ja) },
  { name: "Nej", value: parseInt(voting.nej) },
  { name: "Avstående", value: parseInt(voting.avstaende) },
  { name: "Frånvarande", value: parseInt(voting.franvarande) }
];

import VotingStyles from "./../VotingStyles";

const COLORS = ["#16a085", "#c0392b", "#7f8c8d", "#34495e"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  payload,
  fill,
  value,
  percent
}) => {
  const RADIAN = Math.PI / 180;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}`} stroke={fill} fill="none" />
      <circle cx={mx} cy={my} r={2} fill={fill} stroke="none" />
      <text
        x={mx + (cos >= 0 ? 1 : -1) * 6}
        y={my}
        textAnchor={textAnchor}
        fill={fill}
      >{`${payload.name}: ${value}`}</text>
      <text
        x={mx + (cos >= 0 ? 1 : -1) * 6}
        y={my}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

export default withStyles(VotingStyles)(
  class TotalVote extends React.Component {
    state = {
      data: null
    };

    componentDidMount() {
      const { voting } = this.props;
      this.setState({ data: createData(voting) });
    }

    render() {
      const { classes } = this.props;
      const { data } = this.state;
      return (
        <React.Fragment>
          {data ? (
            <ResponsiveContainer
              height={300}
              className={classes.pieChartContainer}
            >
              <PieChart>
                <Pie
                  data={data}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={5}
                  innerRadius={60}
                  outerRadius={80}
                  label={renderCustomizedLabel}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <CircularProgress />
          )}
        </React.Fragment>
      );
    }
  }
);
