"use client";

import { useMemo, useState } from "react";
import {
  Bot,
  Clock3,
  FileText,
  ShieldAlert,
  Upload,
  X,
} from "lucide-react";

type ResponseLength = "Short" | "Medium" | "Detailed";

type ToneOption = {
  key: "Professional" | "Friendly" | "Formal" | "Casual";
  description: string;
};

type UploadedFile = {
  name: string;
  type: string;
  size: string;
  status: "Uploaded" | "Processing";
  timestamp: string;
};

const responseLengths: ResponseLength[] = ["Short", "Medium", "Detailed"];

const toneOptions: ToneOption[] = [
  { key: "Professional", description: "Business-focused and formal" },
  { key: "Friendly", description: "Warm and approachable" },
  { key: "Formal", description: "Strictly professional" },
  { key: "Casual", description: "Relaxed and conversational" },
];

const statCards = [
  {
    label: "Total Queries Today",
    value: "12,345",
    icon: Bot,
    accent: "text-[#2563eb]",
    bg: "bg-[#eef4ff]",
  },
  {
    label: "Avg Response Time",
    value: "1.2s",
    icon: Clock3,
    accent: "text-[#16a34a]",
    bg: "bg-[#eafaf1]",
  },
  {
    label: "Blocked Queries",
    value: "23",
    icon: ShieldAlert,
    accent: "text-[#ef5b5e]",
    bg: "bg-[#fff1f1]",
  },
];

const fileTypeBadges = [
  { label: "PDF", className: "bg-[#ffe1e1] text-[#ef5b5e]" },
  { label: "DOCX", className: "bg-[#e0f2fe] text-[#2563eb]" },
  { label: "TXT", className: "bg-[#fef3c7] text-[#b45309]" },
  { label: "CSV", className: "bg-[#dcfce7] text-[#16a34a]" },
];

const uploadedFiles: UploadedFile[] = [
  {
    name: "company_guidelines.pdf",
    type: "PDF",
    size: "2.1 MB",
    status: "Uploaded",
    timestamp: "2026-05-16 10:30 AM",
  },
  {
    name: "product_docs.docx",
    type: "DOCX",
    size: "1.8 MB",
    status: "Uploaded",
    timestamp: "2026-05-15 04:25 PM",
  },
  {
    name: "faq_data.txt",
    type: "TXT",
    size: "148 KB",
    status: "Processing",
    timestamp: "2026-05-14 11:10 AM",
  },
];

const defaultKeywords = ["offensive", "spam", "inappropriate"];

export default function AiControlsPage() {
  const [responseLength, setResponseLength] =
    useState<ResponseLength>("Medium");
  const [tone, setTone] = useState<ToneOption["key"]>("Professional");
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>(defaultKeywords);

  const trimmedKeyword = keywordInput.trim();

  const keywordExists = useMemo(
    () =>
      trimmedKeyword.length > 0 &&
      keywords.some((keyword) => keyword === trimmedKeyword.toLowerCase()),
    [keywords, trimmedKeyword],
  );

  const addKeyword = () => {
    if (!trimmedKeyword || keywordExists) {
      return;
    }

    setKeywords((current) => [...current, trimmedKeyword.toLowerCase()]);
    setKeywordInput("");
  };

  const removeKeyword = (keyword: string) => {
    setKeywords((current) => current.filter((item) => item !== keyword));
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 -top-[30px] h-[180px] rounded-[24px] bg-[radial-gradient(75%_120%_at_15%_0%,#ffffff_0%,#f3f5f9_55%,#edf1f7_100%)]" />

      <section className="relative animate-fade-up">
        <h1 className="text-[clamp(24px,1.6vw,28px)] font-extrabold leading-tight text-[#151b26]">
          AI Controls
        </h1>
        <p className="mt-[5px] text-[11px] text-[#4e5b6c]">
          Configure and monitor AI system settings
        </p>
      </section>

      <section
        className="relative mt-[20px] grid gap-[14px] md:grid-cols-2 xl:grid-cols-3 animate-fade-up"
        style={{ animationDelay: "80ms" }}
      >
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.label}
              className="flex items-center justify-between rounded-[9px] border border-[#d9e0e8] bg-white px-[18px] py-[16px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
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
                <p className="mt-[3px] text-[20px] font-extrabold text-[#111827]">
                  {card.value}
                </p>
              </div>

              <div className="text-[9px] font-semibold text-[#8b95a5]">
                Updated
              </div>
            </article>
          );
        })}
      </section>

      <section
        className="relative mt-[20px] grid gap-[20px] xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] animate-fade-up"
        style={{ animationDelay: "140ms" }}
      >
        <div className="space-y-[18px]">
          <article className="rounded-[10px] border border-[#d9e0e8] bg-white px-[20px] py-[18px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
            <h2 className="text-[12px] font-extrabold text-[#111827]">
              AI Response Controls
            </h2>
            <p className="mt-[4px] text-[10px] text-[#6d7480]">
              Control the length of AI responses
            </p>

            <div
              className="mt-[14px] grid grid-cols-3 gap-[10px]"
              role="radiogroup"
              aria-label="Response length"
            >
              {responseLengths.map((option) => {
                const isActive = responseLength === option;

                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setResponseLength(option)}
                    className={`h-[34px] rounded-[7px] text-[11px] font-bold transition ${
                      isActive
                        ? "border border-[#ef5b5e] bg-[#fff1f1] text-[#ef5b5e]"
                        : "border border-[#e1e6ec] text-[#1f2937] hover:border-[#f5b3b5]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </article>

          <article className="rounded-[10px] border border-[#d9e0e8] bg-white px-[20px] py-[18px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
            <h2 className="text-[12px] font-extrabold text-[#111827]">
              AI Knowledge Upload
            </h2>
            <p className="mt-[4px] text-[10px] text-[#6d7480]">
              Upload documents to train your AI assistant
            </p>

            <label className="mt-[12px] flex cursor-pointer items-center justify-center gap-[10px] rounded-[8px] border border-dashed border-[#d6dbe2] bg-[#fafbfc] px-[14px] py-[16px] text-[11px] font-semibold text-[#5b6472] transition hover:border-[#ef5b5e]">
              <input type="file" multiple className="sr-only" />
              <Upload size={16} strokeWidth={2} className="text-[#ef5b5e]" />
              Upload File
            </label>

            <div className="mt-[10px] flex flex-wrap items-center gap-[8px] text-[9px] font-semibold text-[#6d7480]">
              <span>Supported formats:</span>
              {fileTypeBadges.map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex h-[18px] items-center rounded-full px-[8px] ${badge.className}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>

            <div className="mt-[14px]">
              <p className="text-[10px] font-semibold text-[#6d7480]">
                Uploaded Files
              </p>
              <ul className="mt-[10px] space-y-[10px]">
                {uploadedFiles.map((file) => {
                  const isProcessing = file.status === "Processing";

                  return (
                    <li
                      key={file.name}
                      className="flex items-center justify-between rounded-[8px] border border-[#edf0f4] bg-white px-[12px] py-[10px] text-[10px]"
                    >
                      <div className="flex items-center gap-[10px]">
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] bg-[#f1f5f9] text-[#5b6472]">
                          <FileText size={14} strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-[#1f2937]">
                            {file.name}
                          </p>
                          <p className="text-[9px] text-[#8a94a6]">
                            {file.type} - {file.size}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-[14px]">
                        <span
                          className={`inline-flex items-center gap-[6px] rounded-full px-[10px] py-[3px] text-[9px] font-semibold ${
                            isProcessing
                              ? "bg-[#fff7ed] text-[#c2410c]"
                              : "bg-[#ecfdf3] text-[#16a34a]"
                          }`}
                        >
                          <span
                            className={`h-[6px] w-[6px] rounded-full ${
                              isProcessing ? "bg-[#f97316]" : "bg-[#22c55e]"
                            }`}
                          />
                          {file.status}
                        </span>
                        <button
                          type="button"
                          aria-label={`Remove ${file.name}`}
                          className="text-[#ef5b5e] transition hover:text-[#dc2626]"
                        >
                          <X size={12} strokeWidth={2.2} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        </div>

        <div className="space-y-[18px]">
          <article className="rounded-[10px] border border-[#d9e0e8] bg-white px-[20px] py-[18px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
            <h2 className="text-[12px] font-extrabold text-[#111827]">
              AI Tone & Personality
            </h2>
            <p className="mt-[4px] text-[10px] text-[#6d7480]">
              Select the AI communication style
            </p>

            <div
              className="mt-[12px] space-y-[10px]"
              role="radiogroup"
              aria-label="Tone and personality"
            >
              {toneOptions.map((option) => {
                const isActive = tone === option.key;

                return (
                  <button
                    key={option.key}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setTone(option.key)}
                    className={`flex w-full items-center justify-between gap-[10px] rounded-[9px] border px-[12px] py-[10px] text-left transition ${
                      isActive
                        ? "border-[#ef5b5e] bg-[#fff5f5]"
                        : "border-[#e6eaf0] bg-white hover:border-[#f5b3b5]"
                    }`}
                  >
                    <div>
                      <p className="text-[11px] font-semibold text-[#1f2937]">
                        {option.key}
                      </p>
                      <p className="mt-[2px] text-[9px] text-[#8a94a6]">
                        {option.description}
                      </p>
                    </div>
                    <span
                      className={`flex h-[16px] w-[16px] items-center justify-center rounded-full border ${
                        isActive
                          ? "border-[#ef5b5e] bg-[#ef5b5e]"
                          : "border-[#d9dee6]"
                      }`}
                    >
                      <span
                        className={`h-[6px] w-[6px] rounded-full ${
                          isActive ? "bg-white" : "bg-transparent"
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </article>

          <article className="rounded-[10px] border border-[#d9e0e8] bg-white px-[20px] py-[18px] shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
            <h2 className="text-[12px] font-extrabold text-[#111827]">
              AI Restrictions & Safety
            </h2>
            <p className="mt-[4px] text-[10px] text-[#6d7480]">
              Define content restrictions and safety rules
            </p>

            <label className="mt-[12px] block text-[10px] font-semibold text-[#6d7480]">
              Restriction Description
              <textarea
                rows={6}
                placeholder="Describe any specific restrictions or safety guidelines for AI responses..."
                className="mt-[8px] w-full rounded-[8px] border border-[#d9e0e8] bg-white px-[12px] py-[10px] text-[11px] text-[#1f2937] outline-none transition placeholder:text-[#9aa3af] focus:border-[#ef5b5e] focus:ring-2 focus:ring-[#fee2e2]"
              />
            </label>
          </article>
        </div>
      </section>

      <section
        className="relative mt-[20px] rounded-[10px] border border-[#d9e0e8] bg-white px-[20px] py-[18px] shadow-[0_1px_2px_rgba(15,23,42,0.05)] animate-fade-up"
        style={{ animationDelay: "200ms" }}
      >
        <h2 className="text-[12px] font-extrabold text-[#111827]">
          Blocked Keywords
        </h2>
        <p className="mt-[4px] text-[10px] text-[#6d7480]">
          Add keywords to block from all AI responses
        </p>

        <div className="mt-[12px] rounded-[8px] border border-[#d9e0e8] bg-white px-[12px] py-[10px]">
          <input
            type="text"
            value={keywordInput}
            onChange={(event) => setKeywordInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addKeyword();
              }
            }}
            placeholder="Type a keyword and press Enter to add"
            className="w-full text-[11px] text-[#1f2937] outline-none placeholder:text-[#9aa3af]"
          />
        </div>

        <p className="mt-[6px] text-[9px] text-[#9aa3af]">
          Press Enter to add keywords.
          {keywordExists && " Keyword already added."}
        </p>

        <div className="mt-[10px] flex flex-wrap gap-[8px]">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center gap-[6px] rounded-full bg-[#ffe1e1] px-[10px] py-[4px] text-[9px] font-semibold text-[#ef5b5e]"
            >
              {keyword}
              <button
                type="button"
                aria-label={`Remove ${keyword}`}
                onClick={() => removeKeyword(keyword)}
                className="text-[#ef5b5e] transition hover:text-[#dc2626]"
              >
                <X size={10} strokeWidth={2.5} />
              </button>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
