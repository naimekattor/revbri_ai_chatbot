"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueUserData = [
  { month: "Jan", revenue: 38000 },
  { month: "Feb", revenue: 45500 },
  { month: "Mar", revenue: 43000 },
  { month: "Apr", revenue: 58500 },
  { month: "May", revenue: 52000 },
  { month: "Jun", revenue: 65000 },
];

const queryVolumeData = [
  { month: "Jan", queries: 47000 },
  { month: "Feb", queries: 54000 },
  { month: "Mar", queries: 50000 },
  { month: "Apr", queries: 69000 },
  { month: "May", queries: 72000 },
  { month: "Jun", queries: 93000 },
];

const hourlyData = [
  { hour: "12AM", queries: 90 },
  { hour: "1AM", queries: 35 },
  { hour: "2AM", queries: 20 },
  { hour: "3AM", queries: 170 },
  { hour: "4AM", queries: 820 },
  { hour: "5AM", queries: 1180 },
  { hour: "6AM", queries: 1510 },
  { hour: "7AM", queries: 1740 },
  { hour: "8AM", queries: 920 },
  { hour: "9AM", queries: 390 },
  { hour: "10AM", queries: 40 },
  { hour: "11AM", queries: 130 },
  { hour: "12PM", queries: 830 },
  { hour: "1PM", queries: 1180 },
];

const tooltipStyle = {
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
  fontSize: 11,
};

export function RevenueUserGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
      <AreaChart
        data={revenueUserData}
        margin={{ top: 5, right: 8, left: -12, bottom: 0 }}
      >
        <defs>
          <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#ef5b5e" stopOpacity={0.28} />
            <stop offset="95%" stopColor="#ef5b5e" stopOpacity={0.08} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#edf0f4" strokeDasharray="3 3" vertical />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 9, fill: "#7a8493" }}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 9, fill: "#7a8493" }}
          domain={[0, 65000]}
          ticks={[0, 20000, 40000, 60000]}
          width={46}
        />
        <Tooltip
          cursor={{ stroke: "#f8b4b4", strokeDasharray: "3 3" }}
          contentStyle={tooltipStyle}
          formatter={(value) => {
            const amount = typeof value === "number" ? value : Number(value);

            return [`$${amount.toLocaleString()}`, "Revenue"];
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          name="Revenue ($)"
          stroke="#ef5b5e"
          strokeWidth={2}
          fill="url(#revenueFill)"
          isAnimationActive={false}
          activeDot={{ r: 4, fill: "#ef5b5e", stroke: "white" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function AiQueryVolumeChart() {
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
      <BarChart
        data={queryVolumeData}
        margin={{ top: 6, right: 6, left: -10, bottom: 0 }}
      >
        <CartesianGrid stroke="#edf0f4" strokeDasharray="3 3" vertical />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 9, fill: "#7a8493" }}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 9, fill: "#7a8493" }}
          domain={[0, 100000]}
          ticks={[0, 25000, 50000, 75000, 100000]}
          width={44}
        />
        <Tooltip
          cursor={{ fill: "rgba(167,139,250,0.08)" }}
          contentStyle={tooltipStyle}
          formatter={(value) => {
            const count = typeof value === "number" ? value : Number(value);

            return [count.toLocaleString(), "AI Queries"];
          }}
        />
        <Bar
          dataKey="queries"
          name="AI Query Volume"
          fill="#b59af5"
          radius={[6, 6, 0, 0]}
          barSize={34}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function HourlyQueryDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
      <LineChart
        data={hourlyData}
        margin={{ top: 6, right: 18, left: -8, bottom: 0 }}
      >
        <CartesianGrid stroke="#edf0f4" strokeDasharray="3 3" vertical />
        <XAxis
          dataKey="hour"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 9, fill: "#7a8493" }}
          dy={9}
          interval={0}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 9, fill: "#7a8493" }}
          domain={[0, 1800]}
          ticks={[0, 400, 800, 1200, 1600]}
          width={42}
        />
        <Tooltip
          cursor={{ stroke: "#f8b4b4", strokeDasharray: "3 3" }}
          contentStyle={tooltipStyle}
          formatter={(value) => {
            const count = typeof value === "number" ? value : Number(value);

            return [count.toLocaleString(), "Queries"];
          }}
        />
        <Line
          type="monotone"
          dataKey="queries"
          name="Queries"
          stroke="#ef5b5e"
          strokeWidth={2}
          dot={{ r: 3, fill: "#ef5b5e", stroke: "white", strokeWidth: 1 }}
          isAnimationActive={false}
          activeDot={{ r: 4, fill: "#ef5b5e", stroke: "white" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
