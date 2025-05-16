// 온도 그래프 기능
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import { palette } from '../styles/palette';

function TempGraph({ data }) {
  const graphData = data.map((d) => ({
    time: `${new Date(d.dt * 1000).getHours()}시`,
    temp: Math.round(d.temp),
  }));

  return (
    <GraphWrapper>
      <ResponsiveContainer>
        <LineChart
          data={graphData}
          margin={{ top: 12, right: 72, left: 72, bottom: 0 }}
        >
          <XAxis
            dataKey='time'
            tick={false}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 10,
              border: 'none',
              backgroundColor: `${palette.gray40}`,
              color: `${palette.white}`,
            }}
            itemStyle={{
              color: `${palette.gray10}`,
            }}
          />
          <Line
            dataKey='temp'
            stroke={palette.gray20}
            strokeWidth={2}
            dot={{
              r: 4,
              stroke: `${palette.gray20}`,
              strokeWidth: 2,
            }}
            activeDot={{
              stroke: 'none',
              strokeWidth: 0,
              fill: palette.gray20,
            }}
            isAnimationActive={true}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </GraphWrapper>
  );
}

export default TempGraph;

const GraphWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
