"use client";

import dynamic from "next/dynamic";
import { Activity, UserCheck, UserPlus, UserRound, Users } from "lucide-react";

const RevenueGrowthChart = dynamic(
  () =>
    import("./_components/AdminCharts").then((mod) => mod.RevenueGrowthChart),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  },
);

const WeeklyEngagementChart = dynamic(
  () =>
    import("./_components/AdminCharts").then(
      (mod) => mod.WeeklyEngagementChart,
    ),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  },
);

const UserDistributionChart = dynamic(
  () =>
    import("./_components/AdminCharts").then(
      (mod) => mod.UserDistributionChart,
    ),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  },
);

const statCards = [
  {
    label: "Total Users",
    value: "4,807",
    note: "+8.2% from last month",
    icon: Users,
  },
  {
    label: "Active Users",
    value: "3,892",
    note: "81% of total",
    icon: Activity,
  },
  {
    label: "Inactive Users",
    value: "915",
    note: "19% of total",
    icon: UserRound,
  },
];

const activities = [
  {
    name: "John Doe",
    detail: "upgraded to Premium plan",
    time: "2 minutes ago",
  },
  {
    name: "Sarah Smith",
    detail: "registered for webinar 'AI Best Practices'",
    time: "15 minutes ago",
  },
  {
    name: "Mike Johnson",
    detail: "reached 500 AI queries",
    time: "1 hour ago",
  },
  {
    name: "Emma Wilson",
    detail: "submitted collaboration proposal",
    time: "2 hours ago",
  },
  {
    name: "Alex Brown",
    detail: "redeemed coupon 'SUMMER25'",
    time: "3 hours ago",
  },
];

export default function AdminPage() {
  return (
    <>
      <section>
        <h1 className="text-[clamp(25px,1.65vw,29px)] font-extrabold leading-tight tracking-normal text-[#151b26]">
          Dashboard Overview
        </h1>
        <p className="mt-[5px] text-[11px] text-[#4e5b6c]">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>

        <div className="mt-[clamp(22px,1.9vw,34px)] grid gap-[clamp(26px,2vw,36px)] md:grid-cols-3">
          {statCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.label}
                className="flex h-[clamp(114px,8.4vw,148px)] items-center justify-between rounded-[10px] border border-[#d9e0e8] bg-white px-[clamp(22px,1.7vw,30px)] shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
              >
                <div>
                  <p className="text-[10px] font-bold text-[#1f2937]">
                    {card.label}
                  </p>
                  <p className="mt-[9px] text-[clamp(24px,1.6vw,28px)] font-extrabold leading-none text-[#111827]">
                    {card.value}
                  </p>
                  <p
                    className={`mt-[8px] text-[9px] font-semibold ${
                      card.label === "Total Users"
                        ? "text-[#16a34a]"
                        : "text-[#384253]"
                    }`}
                  >
                    {card.note}
                  </p>
                </div>

                <div className="flex h-[clamp(40px,2.85vw,50px)] w-[clamp(40px,2.85vw,50px)] items-center justify-center rounded-lg bg-[#fff1f1] text-[#ef5b5e]">
                  <Icon size={20} strokeWidth={1.9} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-[clamp(22px,1.7vw,30px)] grid gap-[20px] xl:grid-cols-2">
        <article className="h-[clamp(340px,25.4vw,446px)] rounded-[10px] border border-[#d9e0e8] bg-white px-[clamp(22px,1.6vw,28px)] py-[clamp(22px,2vw,35px)] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
          <h2 className="text-[12px] font-extrabold text-[#111827]">
            Revenue Growth
          </h2>

          <div className="mt-[clamp(17px,1.7vw,30px)] h-[clamp(262px,19.4vw,340px)]">
            <RevenueGrowthChart />
          </div>
        </article>

        <article className="h-[clamp(340px,25.4vw,446px)] rounded-[10px] border border-[#d9e0e8] bg-white px-[clamp(22px,1.6vw,28px)] py-[clamp(22px,2vw,35px)] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
          <h2 className="text-[12px] font-extrabold text-[#111827]">
            Weekly Engagement
          </h2>

          <div className="mt-[clamp(17px,1.7vw,30px)] h-[clamp(262px,19.4vw,340px)]">
            <WeeklyEngagementChart />
          </div>
        </article>
      </section>

      <section className="mt-[clamp(20px,1.5vw,26px)] grid gap-[20px] xl:grid-cols-[clamp(340px,25.6vw,450px)_minmax(0,1fr)]">
        <article className="h-[clamp(350px,26.3vw,463px)] rounded-[10px] border border-[#d9e0e8] bg-white px-[22px] py-[22px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
          <h2 className="text-[12px] font-extrabold text-[#111827]">
            User Distribution
          </h2>

          <div className="relative mt-[16px] h-[clamp(250px,17.6vw,310px)]">
            <span className="absolute left-[12px] top-[31px] text-[9px] font-medium text-[#a4abb6]">
              Free Users 67%
            </span>
            <span className="absolute bottom-[27px] right-[14px] text-[9px] font-medium text-[#ef5b5e]">
              Paid Subscribers 33%
            </span>

            <UserDistributionChart />
          </div>

          <div className="flex items-center justify-center gap-[14px]">
            <div className="flex items-center gap-[5px] text-[9px] text-[#6f7885]">
              <span className="h-[8px] w-[12px] bg-[#8f969f]" />
              Free Users
            </div>
            <div className="flex items-center gap-[5px] text-[9px] text-[#ef5b5e]">
              <span className="h-[8px] w-[12px] bg-[#ef5b5e]" />
              Paid Subscribers
            </div>
          </div>
        </article>

        <article className="h-[clamp(350px,26.3vw,463px)] rounded-[10px] border border-[#d9e0e8] bg-white px-[22px] py-[22px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
          <h2 className="text-[12px] font-extrabold text-[#111827]">
            Recent Activities
          </h2>

          <div className="mt-[13px]">
            {activities.map((activity, index) => (
              <div
                key={`${activity.name}-${activity.time}`}
                className={`flex items-start gap-[14px] py-[13px] ${
                  index === activities.length - 1
                    ? ""
                    : "border-b border-[#edf0f4]"
                }`}
              >
                <div className="mt-[1px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[#ffb8b8] bg-[#fff6f6] text-[#ef5b5e]">
                  {index % 2 === 0 ? (
                    <UserPlus size={10} strokeWidth={2} />
                  ) : (
                    <UserCheck size={10} strokeWidth={2} />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[10px] font-semibold text-[#1f2937]">
                    <span className="font-extrabold">{activity.name}</span>{" "}
                    {activity.detail}
                  </p>
                  <p className="mt-[5px] text-[9px] text-[#687386]">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
