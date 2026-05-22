"use client";

import dynamic from "next/dynamic";
import {
  Bot,
  DollarSign,
  TrendingDown,
  Users,
} from "lucide-react";

const RevenueUserGrowthChart = dynamic(
  () =>
    import("../_components/AnalyticsCharts").then(
      (mod) => mod.RevenueUserGrowthChart,
    ),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  },
);

const AiQueryVolumeChart = dynamic(
  () =>
    import("../_components/AnalyticsCharts").then(
      (mod) => mod.AiQueryVolumeChart,
    ),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  },
);

const HourlyQueryDistributionChart = dynamic(
  () =>
    import("../_components/AnalyticsCharts").then(
      (mod) => mod.HourlyQueryDistributionChart,
    ),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  },
);

const performanceCards = [
  {
    label: "Total Revenue (MRR)",
    value: "$328K",
    change: "12.3%",
    trend: "up",
    icon: DollarSign,
    accent: "text-[#16a34a]",
    bg: "bg-[#eafaf1]",
  },
  {
    label: "User Growth",
    value: "9,090",
    change: "8.2%",
    trend: "up",
    icon: Users,
    accent: "text-[#2563eb]",
    bg: "bg-[#eef4ff]",
  },
  {
    label: "AI Queries (MQ)",
    value: "373K",
    change: "21.2%",
    trend: "up",
    icon: Bot,
    accent: "text-[#8b5cf6]",
    bg: "bg-[#f4efff]",
  },
  {
    label: "Churn Rate",
    value: "4.3%",
    change: "5.7%",
    trend: "down",
    icon: TrendingDown,
    accent: "text-[#ef5b5e]",
    bg: "bg-[#fff1f1]",
  },
];

const cohorts = [
  {
    cohort: "Jan 2026",
    week0: "49/136",
    week1: "49/136",
    week2: "48/136",
    week3: "47/136",
    week4: "49/136",
  },
  {
    cohort: "Feb 2026",
    week0: "48/136",
    week1: "48/136",
    week2: "49/136",
    week3: "49/136",
    week4: "49/136",
  },
  {
    cohort: "Mar 2026",
    week0: "49/136",
    week1: "48/136",
    week2: "49/136",
    week3: "49/136",
    week4: "49/136",
  },
];

const cohortColumns = [
  { key: "week0", label: "Week 0" },
  { key: "week1", label: "Week 1" },
  { key: "week2", label: "Week 2" },
  { key: "week3", label: "Week 3" },
  { key: "week4", label: "Week 4" },
] as const;

export default function AnalyticsPage() {
  return (
    <>
      <section>
        <h1 className="text-[clamp(25px,1.65vw,29px)] font-extrabold leading-tight tracking-normal text-[#151b26]">
          Advanced Analytics
        </h1>
        <p className="mt-[6px] text-[11px] text-[#4e5b6c]">
          Deep insights into your platform performance
        </p>
      </section>

      <section className="mt-[24px]">
        <p className="text-[11px] font-semibold text-[#4e5b6c]">
          Performance On A Monthly Basis
        </p>

        <div className="mt-[13px] grid gap-[16px] md:grid-cols-2 xl:grid-cols-4">
          {performanceCards.map((card) => {
            const Icon = card.icon;
            const trendIsUp = card.trend === "up";

            return (
              <article
                key={card.label}
                className="flex h-[111px] items-center justify-between rounded-[9px] border border-[#d9e0e8] bg-white px-[19px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
              >
                <div>
                  <div
                    className={`flex h-[30px] w-[30px] items-center justify-center rounded-[8px] ${card.bg} ${card.accent}`}
                  >
                    <Icon size={15} strokeWidth={2} />
                  </div>
                  <p className="mt-[10px] text-[10px] font-semibold text-[#647084]">
                    {card.label}
                  </p>
                  <p className="mt-[3px] text-[20px] font-extrabold leading-none text-[#111827]">
                    {card.value}
                  </p>
                </div>

                <div
                  className={`mt-[1px] flex self-start pt-[17px] text-[9px] font-extrabold ${
                    trendIsUp ? "text-[#16a34a]" : "text-[#ef4444]"
                  }`}
                >
                  {trendIsUp ? "+" : "-"} {card.change}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-[20px] grid gap-[20px] xl:grid-cols-2">
        <article className="h-[274px] rounded-[10px] border border-[#d9e0e8] bg-white px-[20px] py-[20px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
          <h2 className="text-[12px] font-extrabold text-[#111827]">
            Revenue & User Growth
          </h2>

          <div className="mt-[18px] h-[197px]">
            <RevenueUserGrowthChart />
          </div>

          <div className="flex justify-center text-[9px] font-medium text-[#ef5b5e]">
            <span className="mr-[5px] mt-[5px] h-[2px] w-[10px] bg-[#ef5b5e]" />
            Revenue ($)
          </div>
        </article>

        <article className="h-[274px] rounded-[10px] border border-[#d9e0e8] bg-white px-[20px] py-[20px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
          <h2 className="text-[12px] font-extrabold text-[#111827]">
            AI Query Volume by Month
          </h2>

          <div className="mt-[18px] h-[213px]">
            <AiQueryVolumeChart />
          </div>
        </article>
      </section>

      <section className="mt-[20px] rounded-[10px] border border-[#d9e0e8] bg-white px-[20px] py-[20px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
        <h2 className="text-[12px] font-extrabold text-[#111827]">
          Hourly Query Distribution
        </h2>
        <p className="mt-[4px] text-[9px] text-[#7a8493]">Today</p>

        <div className="mt-[10px] h-[210px]">
          <HourlyQueryDistributionChart />
        </div>
      </section>

      <section className="mt-[20px] rounded-[10px] border border-[#d9e0e8] bg-white px-[20px] py-[20px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
        <h2 className="text-[12px] font-extrabold text-[#111827]">
          User Retention Cohort Analysis
        </h2>

        <div className="mt-[17px] overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead>
              <tr className="bg-[#fafbfc] text-[9px] uppercase text-[#6d7480]">
                <th className="px-[18px] py-[13px] font-extrabold">Cohort</th>
                {cohortColumns.map((column) => (
                  <th
                    key={column.key}
                    className="px-[18px] py-[13px] text-center font-extrabold"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohorts.map((cohort) => (
                <tr
                  key={cohort.cohort}
                  className="border-b border-[#edf0f4] text-[10px] last:border-b-0"
                >
                  <td className="px-[18px] py-[12px] font-extrabold text-[#172033]">
                    {cohort.cohort}
                  </td>
                  {cohortColumns.map((column, index) => {
                    const lowCell =
                      (cohort.cohort === "Jan 2026" && index === 3) ||
                      (cohort.cohort === "Feb 2026" && index === 0);

                    return (
                      <td
                        key={column.key}
                        className="px-[18px] py-[12px] text-center"
                      >
                        <span
                          className={`inline-flex min-w-[86px] justify-center rounded-[4px] px-[12px] py-[5px] font-extrabold ${
                            lowCell
                              ? "bg-[#fee2e2] text-[#ef5b5e]"
                              : "bg-[#dcfce7] text-[#128443]"
                          }`}
                        >
                          {cohort[column.key]}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
