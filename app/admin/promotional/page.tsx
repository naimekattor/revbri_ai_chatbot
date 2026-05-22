"use client";

import { useState } from "react";
import Image from "next/image";
import { PencilLine, Plus, Trash2, Upload } from "lucide-react";

import bannerImage from "@/assets/auth/authImg.jpg";

const banners = Array.from({ length: 11 }, (_, index) => ({
  id: index + 1,
  title: "New User Welcome",
  uploadDate: "2026-12-31",
  expiryDate: "2026-12-31",
  active: true,
}));

export default function PromotionalPage() {
  const [bannerRows, setBannerRows] = useState(banners);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [deleteBannerId, setDeleteBannerId] = useState<number | null>(null);
  const [expireDate, setExpireDate] = useState("");

  const toggleBannerStatus = (bannerId: number) => {
    setBannerRows((currentRows) =>
      currentRows.map((banner) =>
        banner.id === bannerId
          ? { ...banner, active: !banner.active }
          : banner,
      ),
    );
  };

  const closePromoModal = () => {
    setShowPromoModal(false);
    setExpireDate("");
  };

  const confirmDeleteBanner = () => {
    if (deleteBannerId === null) {
      return;
    }

    setBannerRows((currentRows) =>
      currentRows.filter((banner) => banner.id !== deleteBannerId),
    );
    setDeleteBannerId(null);
  };

  return (
    <>
      <section className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[clamp(25px,1.65vw,29px)] font-extrabold leading-tight tracking-normal text-[#151b26]">
            Promotional Management
          </h1>
          <p className="mt-[6px] text-[12px] text-[#4e5b6c]">
            Create and manage your webinars
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowPromoModal(true)}
          className="flex h-[44px] cursor-pointer items-center gap-[10px] rounded-[8px] bg-[#ef5b5e] px-[24px] text-[13px] font-bold text-white shadow-[0_8px_18px_rgba(239,91,94,0.18)] transition hover:bg-[#e65255]"
        >
          <Plus size={17} strokeWidth={2.2} />
          Promo Banner
        </button>
      </section>

      <section className="mt-[33px] rounded-[10px] border border-[#d9e0e8] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
        <div className="border-b border-[#edf0f4] px-[26px] py-[27px]">
          <h2 className="text-[15px] font-extrabold text-[#151b26]">
            Banners List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#edf0f4] bg-[#fafbfc] text-[10px] uppercase tracking-wide text-[#6d7480]">
                <th className="w-[36%] px-[26px] py-[15px] text-center font-bold">
                  Banner
                </th>
                <th className="w-[20%] px-[18px] py-[15px] text-center font-bold">
                  Upload Date
                </th>
                <th className="w-[20%] px-[18px] py-[15px] text-center font-bold">
                  Expiry Date
                </th>
                <th className="w-[14%] px-[18px] py-[15px] text-center font-bold">
                  Status
                </th>
                <th className="w-[10%] px-[26px] py-[15px] text-center font-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bannerRows.map((banner) => (
                <tr
                  key={banner.id}
                  className="border-b border-[#edf0f4] text-[12px] font-semibold text-[#1f2937] last:border-b-0"
                >
                  <td className="px-[26px] py-[14px]">
                    <div className="flex items-center gap-[30px]">
                      <div className="relative h-[40px] w-[76px] shrink-0 overflow-hidden rounded-[6px] bg-[#edf0f4]">
                        <Image
                          src={bannerImage}
                          alt={banner.title}
                          fill
                          sizes="76px"
                          className="object-cover object-left"
                        />
                      </div>
                      <span>{banner.title}</span>
                    </div>
                  </td>
                  <td className="px-[18px] py-[14px] text-center">
                    {banner.uploadDate}
                  </td>
                  <td className="px-[18px] py-[14px] text-center">
                    {banner.expiryDate}
                  </td>
                  <td className="px-[18px] py-[14px]">
                    <div className="flex items-center justify-center gap-[12px]">
                      <span
                        className={`inline-flex h-[22px] items-center rounded-full px-[12px] text-[10px] font-extrabold ${
                          banner.active
                            ? "bg-[#dcfce7] text-[#16a34a]"
                            : "bg-[#eef2f7] text-[#475569]"
                        }`}
                      >
                        {banner.active ? "Active" : "Inactive"}
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={banner.active}
                        aria-label={`Toggle ${banner.title} banner status`}
                        onClick={() => toggleBannerStatus(banner.id)}
                        className={`relative h-[18px] w-[33px] rounded-full transition ${
                          banner.active ? "bg-[#ef5b5e]" : "bg-[#cbd5e1]"
                        }`}
                      >
                        <span
                          className={`absolute top-1/2 h-[13px] w-[13px] -translate-y-1/2 rounded-full bg-white shadow-sm transition ${
                            banner.active ? "right-[3px]" : "left-[3px]"
                          }`}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-[26px] py-[14px]">
                    <div className="flex items-center justify-center gap-[20px]">
                      <button
                        type="button"
                        aria-label={`Edit ${banner.title} banner`}
                        className="text-[#334155] transition hover:text-[#ef5b5e]"
                      >
                        <PencilLine size={15} strokeWidth={1.9} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${banner.title} banner`}
                        onClick={() => setDeleteBannerId(banner.id)}
                        className="text-[#ef5b5e] transition hover:text-[#dc2626]"
                      >
                        <Trash2 size={15} strokeWidth={1.9} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showPromoModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-banner-title"
        >
          <div className="w-full max-w-[475px] rounded-[8px] bg-white px-[18px] pb-[24px] pt-[19px] shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
            <h2 id="promo-banner-title" className="sr-only">
              Add Promo Banner
            </h2>

            <label className="block">
              <span className="text-[12px] font-extrabold text-[#1f2937]">
                Expire Date
              </span>
              <input
                type="text"
                value={expireDate}
                onChange={(event) => setExpireDate(event.target.value)}
                placeholder="Select Date"
                className="mt-[9px] h-[30px] w-full rounded-[7px] border border-[#d9e0e8] px-[11px] text-[11px] text-[#1f2937] outline-none transition placeholder:text-[#8b9099] focus:border-[#ef5b5e] focus:ring-2 focus:ring-[#fee2e2]"
              />
            </label>

            <div className="mt-[18px]">
              <p className="text-[12px] font-extrabold text-[#1f2937]">
                Thumbnail Image
              </p>
              <label className="mt-[9px] flex h-[126px] cursor-pointer flex-col items-center justify-center rounded-[8px] border border-dashed border-[#b8c1cf] text-center transition hover:border-[#ef5b5e] hover:bg-[#fff7f7]">
                <Upload className="text-[#98a2b3]" size={31} strokeWidth={2} />
                <span className="mt-[12px] text-[12px] text-[#4b5563]">
                  Click to upload or drag and drop
                </span>
                <span className="mt-[6px] text-[10px] text-[#6b7280]">
                  PNG, JPG up to 10MB
                </span>
                <input type="file" accept="image/png,image/jpeg" className="sr-only" />
              </label>
            </div>

            <div className="mt-[18px] grid grid-cols-2 gap-[12px]">
              <button
                type="button"
                onClick={closePromoModal}
                className="h-[28px] rounded-[7px] border border-[#d9e0e8] bg-white text-[11px] font-extrabold text-[#273244] transition hover:bg-[#f8fafc]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={closePromoModal}
                className="h-[28px] rounded-[7px] bg-[#ef5b5e] text-[11px] font-extrabold text-white shadow-[0_7px_16px_rgba(239,91,94,0.2)] transition hover:bg-[#e65255]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteBannerId !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-banner-title"
        >
          <div className="relative w-full max-w-[385px] rounded-[8px] bg-white px-[31px] pb-[22px] pt-[31px] shadow-[0_18px_42px_rgba(0,0,0,0.2)]">
            <button
              type="button"
              aria-label="Close delete confirmation"
              onClick={() => setDeleteBannerId(null)}
              className="absolute right-[11px] top-[8px] text-[12px] leading-none text-[#5b607a] transition hover:text-[#151b26]"
            >
              x
            </button>

            <h2
              id="delete-banner-title"
              className="text-center text-[14px] font-extrabold leading-tight text-[#565a75]"
            >
              Are You Sure About Deleting Banner?
            </h2>

            <div className="mt-[25px] grid grid-cols-2 gap-[13px]">
              <button
                type="button"
                onClick={() => setDeleteBannerId(null)}
                className="h-[36px] rounded-[5px] border border-[#ff5f63] bg-white text-[10px] font-extrabold text-[#ff5f63] transition hover:bg-[#fff5f5]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteBanner}
                className="h-[36px] rounded-[5px] bg-[#ff6669] text-[10px] font-extrabold text-white shadow-[0_8px_18px_rgba(255,102,105,0.32)] transition hover:bg-[#ef5b5e]"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
