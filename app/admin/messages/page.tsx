"use client";

import { useState } from "react";
import {
  CalendarDays,
  Mail,
  PencilLine,
  Plus,
  Trash2,
} from "lucide-react";

const initialEmails = [
  { id: 1, audience: "Free Users", active: true },
  { id: 2, audience: "Tiered Users", active: true },
  { id: 3, audience: "Business Users", active: true },
  { id: 4, audience: "Premium Users", active: true },
  { id: 5, audience: "Free Users", active: true },
  { id: 6, audience: "Free Users", active: true },
  { id: 7, audience: "Free Users", active: true },
];

export default function MessagesPage() {
  const [emails, setEmails] = useState(initialEmails);

  const toggleEmailStatus = (emailId: number) => {
    setEmails((currentEmails) =>
      currentEmails.map((email) =>
        email.id === emailId ? { ...email, active: !email.active } : email,
      ),
    );
  };

  const deleteEmail = (emailId: number) => {
    setEmails((currentEmails) =>
      currentEmails.filter((email) => email.id !== emailId),
    );
  };

  return (
    <>
      <section className="flex items-center justify-between gap-6">
        <h1 className="text-[clamp(24px,1.55vw,28px)] font-extrabold leading-tight tracking-normal text-[#151b26]">
          List of Emails
        </h1>

        <div className="flex items-center gap-[18px]">
          <button
            type="button"
            className="flex h-[42px] items-center justify-center gap-[10px] rounded-[7px] bg-[#ef5b5e] px-[24px] text-[12px] font-extrabold text-white shadow-[0_7px_16px_rgba(239,91,94,0.16)] transition hover:bg-[#e65255]"
          >
            <Plus size={14} strokeWidth={2.3} />
            Create Email
          </button>
          <button
            type="button"
            className="flex h-[42px] items-center justify-center gap-[10px] rounded-[7px] bg-[#ef5b5e] px-[24px] text-[12px] font-extrabold text-white shadow-[0_7px_16px_rgba(239,91,94,0.16)] transition hover:bg-[#e65255]"
          >
            <Plus size={14} strokeWidth={2.3} />
            Push Notification
          </button>
        </div>
      </section>

      <section className="mt-[32px] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] border-collapse text-left">
            <thead>
              <tr className="bg-[#ededed] text-[10px] uppercase tracking-normal text-[#687283]">
                <th className="w-[29%] px-[40px] py-[18px] text-center font-bold">
                  Audience
                </th>
                <th className="w-[24%] px-[24px] py-[18px] text-center font-bold">
                  Date
                </th>
                <th className="w-[20%] px-[24px] py-[18px] text-center font-bold">
                  Time
                </th>
                <th className="w-[13%] px-[24px] py-[18px] text-center font-bold">
                  Status
                </th>
                <th className="w-[14%] px-[30px] py-[18px] text-center font-bold">
                  Offer Package
                </th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <tr
                  key={email.id}
                  className="border-b border-[#edf0f4] text-[11px] text-[#172033] last:border-b-0"
                >
                  <td className="px-[40px] py-[31px]">
                    <div className="flex items-center gap-[7px]">
                      <Mail size={13} className="text-[#7b8794]" strokeWidth={1.8} />
                      <span className="font-extrabold">{email.audience}</span>
                    </div>
                  </td>

                  <td className="px-[24px] py-[31px] text-center font-medium">
                    September 24, 2017
                  </td>

                  <td className="px-[24px] py-[31px]">
                    <div className="flex items-center justify-center gap-[7px]">
                      <CalendarDays
                        size={12}
                        className="text-[#7b8794]"
                        strokeWidth={1.9}
                      />
                      <span className="font-medium">01:34 pm</span>
                    </div>
                  </td>

                  <td className="px-[24px] py-[31px]">
                    <div className="flex items-center justify-center gap-[12px]">
                      <span className="font-semibold">
                        {email.active ? "Active" : "Inactive"}
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={email.active}
                        aria-label={`Toggle ${email.audience} email status`}
                        onClick={() => toggleEmailStatus(email.id)}
                        className={`relative h-[17px] w-[31px] rounded-full transition ${
                          email.active ? "bg-[#ef5b5e]" : "bg-[#cbd5e1]"
                        }`}
                      >
                        <span
                          className={`absolute top-1/2 h-[12px] w-[12px] -translate-y-1/2 rounded-full bg-white shadow-sm transition ${
                            email.active ? "right-[3px]" : "left-[3px]"
                          }`}
                        />
                      </button>
                    </div>
                  </td>

                  <td className="px-[30px] py-[31px]">
                    <div className="flex items-center justify-center gap-[14px]">
                      <button
                        type="button"
                        className="flex items-center gap-[6px] rounded-[5px] bg-[#faf7ff] px-[8px] py-[5px] text-[10px] font-extrabold text-[#111827] transition hover:bg-[#f3e8ff]"
                      >
                        <PencilLine
                          size={12}
                          className="text-[#8b5cf6]"
                          strokeWidth={2}
                        />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteEmail(email.id)}
                        className="flex items-center gap-[6px] rounded-[5px] px-[8px] py-[5px] text-[10px] font-extrabold text-[#111827] transition hover:bg-[#fff1f1]"
                      >
                        <Trash2
                          size={12}
                          className="text-[#ef4444]"
                          strokeWidth={2}
                        />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="h-[143px] border-t border-[#edf0f4] bg-white" />
        </div>
      </section>
    </>
  );
}
