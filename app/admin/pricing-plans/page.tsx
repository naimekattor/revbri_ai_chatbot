"use client";

import { useState, type FormEvent } from "react";
import { Check, DollarSign, Edit, Gift, Users } from "lucide-react";

type PlanFeature = {
  name: string;
  active: boolean;
};

type PricingPlan = {
  id: number;
  name: string;
  type: string;
  price: string;
  pricePerMember: string;
  billingCycle: string;
  badgeLabel: string;
  popular: boolean;
  active: boolean;
  limit: string;
  features: PlanFeature[];
};

const initialPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Free",
    type: "Tier Plan",
    price: "$0",
    pricePerMember: "0",
    billingCycle: "Monthly",
    badgeLabel: "",
    popular: false,
    active: true,
    limit: "100",
    features: [
      { name: "Basic support", active: true },
      { name: "Community access", active: true },
      { name: "Email updates", active: true },
    ],
  },
  {
    id: 2,
    name: "Premium",
    type: "Tier Plan",
    price: "$99",
    pricePerMember: "99",
    billingCycle: "Monthly",
    badgeLabel: "Most Popular",
    popular: true,
    active: true,
    limit: "100",
    features: [
      { name: "Priority support", active: true },
      { name: "Advanced analytics", active: true },
      { name: "Webinar access", active: true },
      { name: "API integration", active: true },
      { name: "Custom branding", active: true },
    ],
  },
  {
    id: 3,
    name: "Business",
    type: "Tier Plan",
    price: "$99",
    pricePerMember: "99",
    billingCycle: "Monthly",
    badgeLabel: "",
    popular: false,
    active: true,
    limit: "1000",
    features: [
      { name: "24/7 dedicated support", active: true },
      { name: "Advanced analytics & reports", active: true },
      { name: "All webinars included", active: true },
      { name: "Full API access", active: true },
      { name: "White-label options", active: true },
      { name: "Team collaboration", active: true },
      { name: "Custom integrations", active: true },
    ],
  },
  {
    id: 4,
    name: "Premium",
    type: "Tier Plan",
    price: "$99",
    pricePerMember: "99",
    billingCycle: "Monthly",
    badgeLabel: "",
    popular: false,
    active: true,
    limit: "1000",
    features: [
      { name: "24/7 dedicated support", active: true },
      { name: "Advanced analytics & reports", active: true },
      { name: "All webinars included", active: true },
      { name: "Full API access", active: true },
      { name: "White-label options", active: true },
      { name: "Team collaboration", active: true },
      { name: "Custom integrations", active: true },
    ],
  },
];

const analyticsCards = [
  {
    label: "Free Users",
    value: "3,240",
    note: "67% of total users",
    icon: Users,
    accent: "text-[#2563eb]",
    bg: "bg-[#eef4ff]",
  },
  {
    label: "Paid Users",
    value: "1,567",
    note: "33% of total users",
    icon: Users,
    accent: "text-[#16a34a]",
    bg: "bg-[#eafaf1]",
  },
  {
    label: "Total Revenue",
    value: "$68,753",
    note: "Monthly recurring revenue",
    icon: DollarSign,
    accent: "text-[#ef5b5e]",
    bg: "bg-[#fff1f1]",
  },
];

const revenueRows = [
  {
    name: "Free Plan",
    users: "3,240 users",
    revenue: "$0",
    fill: "67%",
  },
  {
    name: "Premium Plan",
    users: "1,234 users",
    revenue: "$35,786",
    fill: "26%",
  },
  {
    name: "Business Plan",
    users: "333 users",
    revenue: "$32,967",
    fill: "8%",
  },
];

export default function PricingPlansPage() {
  const [plans, setPlans] = useState(initialPlans);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  const togglePlan = (planId: number) => {
    setPlans((currentPlans) =>
      currentPlans.map((plan) =>
        plan.id === planId ? { ...plan, active: !plan.active } : plan,
      ),
    );
  };

  const openEditModal = (plan: PricingPlan) => {
    setEditingPlan({
      ...plan,
      features: plan.features.map((feature) => ({ ...feature })),
    });
  };

  const closeEditModal = () => {
    setEditingPlan(null);
  };

  const updateEditingPlan = (updates: Partial<PricingPlan>) => {
    setEditingPlan((currentPlan) =>
      currentPlan ? { ...currentPlan, ...updates } : currentPlan,
    );
  };

  const updateEditingFeature = (
    featureIndex: number,
    updates: Partial<PlanFeature>,
  ) => {
    setEditingPlan((currentPlan) =>
      currentPlan
        ? {
            ...currentPlan,
            features: currentPlan.features.map((feature, index) =>
              index === featureIndex ? { ...feature, ...updates } : feature,
            ),
          }
        : currentPlan,
    );
  };

  const saveEditedPlan = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingPlan) {
      return;
    }

    const nextPrice = editingPlan.pricePerMember.trim() || "0";
    const badgeLabel = editingPlan.badgeLabel.trim();
    const updatedPlan = {
      ...editingPlan,
      name: editingPlan.name.trim() || "Untitled Plan",
      type: editingPlan.type.trim() || "Tier Plan",
      price: `$${nextPrice}`,
      pricePerMember: nextPrice,
      billingCycle: editingPlan.billingCycle.trim() || "Monthly",
      badgeLabel,
      popular: Boolean(badgeLabel),
      limit: editingPlan.limit.trim() || "0",
      features: editingPlan.features.map((feature) => ({
        ...feature,
        name: feature.name.trim() || "Plan feature",
      })),
    };

    setPlans((currentPlans) =>
      currentPlans.map((plan) =>
        plan.id === updatedPlan.id ? updatedPlan : plan,
      ),
    );
    closeEditModal();
  };

  return (
    <>
      <section>
        <h1 className="text-[clamp(25px,1.65vw,29px)] font-extrabold leading-tight tracking-normal text-[#151b26]">
          Pricing Plans
        </h1>
        <p className="mt-[6px] text-[12px] text-[#4e5b6c]">
          Manage and edit your subscription plans
        </p>
      </section>

      <section className="mt-[30px] grid gap-[18px] xl:grid-cols-4">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={`relative flex min-h-[470px] flex-col rounded-[9px] border bg-white px-[20px] pb-[19px] pt-[29px] shadow-[0_1px_2px_rgba(15,23,42,0.05)] ${
              plan.popular ? "border-[#ef5b5e]" : "border-[#d9e0e8]"
            }`}
          >
            {plan.popular && (
              <div className="absolute left-0 right-0 top-0 flex h-[31px] items-center justify-center rounded-t-[8px] bg-[#ef5b5e] text-[10px] font-bold text-white">
                {plan.badgeLabel || "Most Popular"}
              </div>
            )}

            <div className={plan.popular ? "pt-[18px]" : ""}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[20px] font-extrabold text-[#151b26]">
                    {plan.name}
                  </h2>
                  <div className="mt-[8px] flex items-end gap-[3px]">
                    <span className="text-[30px] font-extrabold leading-none text-[#111827]">
                      {plan.price}
                    </span>
                    <span className="mb-[3px] text-[11px] text-[#4e5b6c]">
                      /{plan.billingCycle.toLowerCase()}
                    </span>
                  </div>
                </div>

                <div className="mt-[2px] flex items-center gap-[9px]">
                  <span className="text-[10px] text-[#1f2937]">Active</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={plan.active}
                    onClick={() => togglePlan(plan.id)}
                    className={`relative h-[17px] w-[31px] rounded-full transition ${
                      plan.active ? "bg-[#ef5b5e]" : "bg-[#cbd5e1]"
                    }`}
                  >
                    <span
                      className={`absolute top-1/2 h-[12px] w-[12px] -translate-y-1/2 rounded-full bg-white shadow-sm transition ${
                        plan.active ? "right-[3px]" : "left-[3px]"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-[26px] rounded-[8px] bg-[#fafbfc] px-[15px] py-[17px]">
                <p className="text-[10px] text-[#6d7480]">AI Query Limit</p>
                <p className="mt-[5px] text-[20px] font-extrabold text-[#ef5b5e]">
                  {plan.limit}
                  <span className="ml-[4px] text-[11px] font-medium text-[#4e5b6c]">
                    /month
                  </span>
                </p>
              </div>

              <ul className="mt-[29px] space-y-[13px]">
                {plan.features.filter((feature) => feature.active).map((feature, index) => (
                  <li
                    key={`${feature.name}-${index}`}
                    className="flex items-center gap-[10px] text-[11px] text-[#334155]"
                  >
                    <Check size={13} className="text-[#16a34a]" strokeWidth={2.2} />
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => openEditModal(plan)}
              className="mt-auto flex h-[33px] w-full items-center justify-center gap-[7px] rounded-[6px] bg-[#ef5b5e] text-[11px] font-bold text-white transition hover:bg-[#e65255]"
            >
              <Edit size={12} strokeWidth={2} />
              Edit Plan
            </button>
          </article>
        ))}
      </section>

      <section className="mt-[30px] rounded-[10px] border border-[#d9e0e8] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
        <div className="border-b border-[#edf0f4] px-[25px] py-[27px]">
          <h2 className="text-[15px] font-extrabold text-[#151b26]">
            Plan Analytics
          </h2>
        </div>

        <div className="px-[25px] py-[24px]">
          <div className="grid gap-[25px] lg:grid-cols-3">
            {analyticsCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.label}
                  className="flex h-[105px] items-center gap-[18px] rounded-[10px] border border-[#d9e0e8] bg-white px-[24px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
                >
                  <div
                    className={`flex h-[42px] w-[42px] items-center justify-center rounded-[9px] ${card.bg} ${card.accent}`}
                  >
                    <Icon size={19} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#1f2937]">
                      {card.label}
                    </p>
                    <p className="mt-[4px] text-[21px] font-extrabold leading-none text-[#111827]">
                      {card.value}
                    </p>
                    <p
                      className={`mt-[8px] text-[10px] ${
                        card.label === "Total Revenue"
                          ? "text-[#ef5b5e]"
                          : card.accent
                      }`}
                    >
                      {card.note}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <section className="mt-[28px] rounded-[10px] border border-[#d9e0e8] bg-white px-[22px] py-[22px]">
            <h3 className="text-[13px] font-extrabold text-[#151b26]">
              Users & Revenue by Package
            </h3>

            <div className="mt-[20px] space-y-[18px]">
              {revenueRows.map((row) => (
                <article
                  key={row.name}
                  className="rounded-[8px] border border-[#e5eaf0] bg-white px-[16px] py-[14px]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-[14px]">
                      <div className="flex h-[31px] w-[31px] items-center justify-center rounded-full bg-[#fff1f1] text-[#ef5b5e]">
                        <Gift size={15} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-[12px] font-extrabold text-[#1f2937]">
                          {row.name}
                        </p>
                        <p className="mt-[2px] text-[10px] text-[#6d7480]">
                          {row.users}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[12px] font-extrabold text-[#ef5b5e]">
                        {row.revenue}
                      </p>
                      <p className="mt-[2px] text-[9px] text-[#4e5b6c]">
                        Monthly revenue
                      </p>
                    </div>
                  </div>

                  <div className="mt-[13px] h-[6px] overflow-hidden rounded-full bg-[#e5e7eb]">
                    <div
                      className="h-full rounded-full bg-[#ef5b5e]"
                      style={{ width: row.fill }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      {editingPlan && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-plan-title"
        >
          <form
            onSubmit={saveEditedPlan}
            className="relative max-h-[calc(100vh_-_44px)] w-full max-w-[620px] overflow-y-auto rounded-[9px] bg-white shadow-[0_18px_44px_rgba(0,0,0,0.22)]"
          >
            <div className="flex items-center justify-between border-b border-[#edf0f4] px-[24px] py-[21px]">
              <h2
                id="edit-plan-title"
                className="text-[20px] font-extrabold text-[#151b26]"
              >
                Edit Plan
              </h2>
              <button
                type="button"
                aria-label="Close edit plan"
                onClick={closeEditModal}
                className="text-[18px] leading-none text-[#8a93a3] transition hover:text-[#151b26]"
              >
                x
              </button>
            </div>

            <div className="px-[24px] pb-[24px] pt-[20px]">
              <label className="block">
                <span className="text-[11px] font-extrabold text-[#1f2937]">
                  Plan Name
                </span>
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={(event) =>
                    updateEditingPlan({ name: event.target.value })
                  }
                  className="mt-[8px] h-[34px] w-full rounded-[7px] border border-[#d9e0e8] px-[12px] text-[11px] font-medium text-[#1f2937] outline-none transition focus:border-[#ef5b5e] focus:ring-2 focus:ring-[#fee2e2]"
                />
              </label>

              <label className="mt-[18px] block">
                <span className="text-[11px] font-extrabold text-[#1f2937]">
                  Type of Plan
                </span>
                <input
                  type="text"
                  value={editingPlan.type}
                  onChange={(event) =>
                    updateEditingPlan({ type: event.target.value })
                  }
                  className="mt-[8px] h-[34px] w-full rounded-[7px] border border-[#d9e0e8] px-[12px] text-[11px] font-medium text-[#1f2937] outline-none transition focus:border-[#ef5b5e] focus:ring-2 focus:ring-[#fee2e2]"
                />
              </label>

              <div className="mt-[18px] grid grid-cols-2 gap-[14px]">
                <label className="block">
                  <span className="text-[11px] font-extrabold text-[#1f2937]">
                    Price Per Member ($)
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={editingPlan.pricePerMember}
                    onChange={(event) =>
                      updateEditingPlan({
                        pricePerMember: event.target.value,
                      })
                    }
                    className="mt-[8px] h-[34px] w-full rounded-[7px] border border-[#d9e0e8] px-[12px] text-[11px] font-medium text-[#1f2937] outline-none transition focus:border-[#ef5b5e] focus:ring-2 focus:ring-[#fee2e2]"
                  />
                </label>

                <label className="block">
                  <span className="text-[11px] font-extrabold text-[#1f2937]">
                    Billing Cycle
                  </span>
                  <input
                    type="text"
                    value={editingPlan.billingCycle}
                    onChange={(event) =>
                      updateEditingPlan({
                        billingCycle: event.target.value,
                      })
                    }
                    className="mt-[8px] h-[34px] w-full rounded-[7px] border border-[#d9e0e8] px-[12px] text-[11px] font-medium text-[#1f2937] outline-none transition focus:border-[#ef5b5e] focus:ring-2 focus:ring-[#fee2e2]"
                  />
                </label>
              </div>

              <label className="mt-[18px] block">
                <span className="text-[11px] font-extrabold text-[#1f2937]">
                  AI Query Limit (per month)
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={editingPlan.limit}
                  onChange={(event) =>
                    updateEditingPlan({ limit: event.target.value })
                  }
                  className="mt-[8px] h-[34px] w-full rounded-[7px] border border-[#d9e0e8] px-[12px] text-[11px] font-medium text-[#1f2937] outline-none transition focus:border-[#ef5b5e] focus:ring-2 focus:ring-[#fee2e2]"
                />
              </label>

              <label className="mt-[18px] block">
                <span className="text-[11px] font-extrabold text-[#1f2937]">
                  Badge/Label Name
                </span>
                <input
                  type="text"
                  value={editingPlan.badgeLabel}
                  placeholder="Most Popular"
                  onChange={(event) =>
                    updateEditingPlan({ badgeLabel: event.target.value })
                  }
                  className="mt-[8px] h-[34px] w-full rounded-[7px] border border-[#d9e0e8] px-[12px] text-[11px] font-medium text-[#1f2937] outline-none transition placeholder:text-[#9aa3af] focus:border-[#ef5b5e] focus:ring-2 focus:ring-[#fee2e2]"
                />
              </label>

              <div className="mt-[18px]">
                <p className="text-[11px] font-extrabold text-[#1f2937]">
                  Features
                </p>
                <div className="mt-[8px] space-y-[8px]">
                  {editingPlan.features.map((feature, index) => (
                    <div
                      key={`${feature.name}-${index}`}
                      className="flex h-[34px] items-center gap-[10px] rounded-[7px] border border-[#d9e0e8] bg-white pl-[12px] pr-[8px]"
                    >
                      <input
                        type="text"
                        value={feature.name}
                        onChange={(event) =>
                          updateEditingFeature(index, {
                            name: event.target.value,
                          })
                        }
                        className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[11px] font-medium text-[#4b5563] outline-none"
                      />
                      <span className="text-[9px] font-semibold text-[#4b5563]">
                        Active
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={feature.active}
                        aria-label={`Toggle ${feature.name} feature status`}
                        onClick={() =>
                          updateEditingFeature(index, {
                            active: !feature.active,
                          })
                        }
                        className={`relative h-[17px] w-[31px] shrink-0 rounded-full transition ${
                          feature.active ? "bg-[#ef5b5e]" : "bg-[#cbd5e1]"
                        }`}
                      >
                        <span
                          className={`absolute top-1/2 h-[12px] w-[12px] -translate-y-1/2 rounded-full bg-white shadow-sm transition ${
                            feature.active ? "right-[3px]" : "left-[3px]"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-[24px] grid grid-cols-2 gap-[14px]">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="h-[37px] rounded-[7px] border border-[#d9e0e8] bg-white text-[11px] font-extrabold text-[#273244] transition hover:bg-[#f8fafc]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-[37px] rounded-[7px] bg-[#ef5b5e] text-[11px] font-extrabold text-white shadow-[0_7px_16px_rgba(239,91,94,0.2)] transition hover:bg-[#e65255]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
