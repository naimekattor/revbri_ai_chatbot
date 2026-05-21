import Image from "next/image";
import React from "react";
import authImage from "@/assets/auth/authImg.jpg";
import authLogo from "@/assets/auth/authLogo.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="flex w-full md:h-screen">
        <section className="w-1/2 hidden md:flex relative">
          <div className="bg-white p-5 absolute rounded-br-[56px]">
            <Image src={authLogo} alt="Auth Logo" width={150} />
          </div>
          <Image
            className="w-full h-full object-left object-cover"
            src={authImage}
            alt="Auth Image"
            height={700}
            width={600}
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
            <div className="rounded-t-[200px] rounded-b-none bg-linear-to-b from-[#3b37370e] to-[#0000000e] shadow-[0_4px_6.7px_0_rgba(8,4,31,0.12)] backdrop-blur-[15.8px] w-[80%] p-5 text-white text-center">
              <h1 className="font-sans font-bold text-2xl mb-4">
                Ai Powered analysis and assessment
              </h1>
              <p className="font-sans text-base font-normal text-justify">
                Empowering hotels and restaurants with AI-driven solutions to
                enhance guest experiences and streamline digital services. Sign
                in to manage your business and connect with customers
                effortlessly.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full md:w-1/2 flex items-center justify-center p-4">
          {children}
        </section>
      </main>
    </div>
  );
}
