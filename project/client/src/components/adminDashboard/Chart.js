import React from "react";
import "../../scss/chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
];

const Chart = ({ aspect, title, orders }) => {
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();

    return `${month} ${day}`;
  }

  //   const formattedDate = orders.map((order) => formatTimestamp(order.date));

  // console.log(orders[0].date);
  //   const sdata = orders
  //     .map((order) => ({
  //       name: formattedDate,
  //       total: `${order.moneyTransfered}`, // Add your desired text after the moneyTransfered value
  //     }))
  //     .reverse();

  //   console.log(sdata);

  return (
    <div className="chart">
      <div className="title">Number of Students</div>

      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
