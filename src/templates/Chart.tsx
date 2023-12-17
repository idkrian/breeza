import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DaysForecastProps } from "../helpers/interfaces";

interface Props {
  daysForecast?: DaysForecastProps;
}

const Chart = ({ daysForecast }: Props) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "numeric",
    day: "numeric",
  };
  const array = daysForecast;
  const combinedData = array?.time.map((time: string, index: number) => ({
    name: new Date(time).toLocaleDateString("en-US", options),
    temperature: array.temperature_2m_max[index],
  }));

  return (
    <div className="h-full w-full">
      <ResponsiveContainer>
        <AreaChart
          data={combinedData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#0095ff"
            fill="#0095ff"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
