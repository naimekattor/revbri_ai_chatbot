import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton({
  isText = true,
  text = "back",
}: {
  isText?: boolean;
  text?: string;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center gap-2 text-gray-500 hover:cursor-pointer"
    >
      <ArrowLeft size={18} />
      {isText && <p>{text}</p>}
    </button>
  );
}
