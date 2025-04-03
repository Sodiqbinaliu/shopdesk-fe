'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import airbnb from "@/public/home-images/airbnb.svg";
import coinbase from "@/public/home-images/coinbase.svg";
import displayScreenSm from "@/public/home-images/displayScreenSm.png";
import displayScreen from "@/public/home-images/displayscreen.svg";
import fiberplane from "@/public/home-images/fiberplane.svg";
import griffin from "@/public/home-images/griffin.svg";
import helpscout from "@/public/home-images/helpscout.svg";
import patreon from "@/public/home-images/patreon.svg";
import plaid from "@/public/home-images/plaid.svg";
import "aos/dist/aos.css";
import useAos from "./useAos";
export default function Hero() {
  useAos();
  return (
    <>
      <div className=" flex flex-col items-center gap-6 pt-10 max-w-[1000px] mx-auto px-5 min-[600px]:px-10">
        <h1
          className="text-[clamp(36px,_6vw,_60px)] max-w-[947px] leading-14 font-circular-bold md:leading-16 text-center"
          data-aos="fade-down"
          data-aos-once="false" // Allow this element to re-animate
        >
          <span className="text-[#19A45B]">Simplify</span> Inventory Management
          for Your Business
        </h1>

        <p
          className="text-gray-600 text-base leading-6 md:text-[24px] md:leading-9 font-circular-light text-center font-light min-[400px]:px-5"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-once="false" // Allow this element to re-animate
        >
          ShopDesk is a cloud based inventory management software that helps you
          track stock, process sales, and generate business records so you can
          focus on growing your business.
        </p>
      </div>

      <Link
        href="/sign-up"
        className="w-full flex justify-center items-center mt-8 -mb-4"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-once="false"
      >
        <button className="btn-primary">Start your free trial</button>
      </Link>

      <div className="w-full md:mt-[40px] mt-[20px] flex flex-col items-center">
        <Image
          src={displayScreen}
          alt="Display screen"
          className="w-[clamp(320px,_70vw,_850px)] max-w-[850px] hidden md:block"
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-once="false" // Allow this element to re-animate
        />
        <Image
          src={displayScreenSm}
          alt="Display screen"
          className="w-[clamp(320px,_70vw,_850px)] max-w-[850px] md:hidden mb-6"
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-once="false" // Allow this element to re-animate
        />

        <div
          hidden // hidden for now
          className="bg-[#19A45B] w-full px-[clamp(18px,_3vw,_80px)] p-6 flex items-center gap-[clamp(16px,_3vw,_48px)] justify-center flex-wrap h-fit"
          data-aos="fade-up"
          data-aos-once="false" // Allow this element to re-animate
        >
          {[
            patreon,
            airbnb,
            fiberplane,
            coinbase,
            griffin,
            helpscout,
            plaid,
          ].map((logo, index) => (
            <Image
              key={index}
              src={logo}
              alt="Logo"
              className="w-[clamp(70px,_11vw,_140px)]"
              data-aos="fade-up"
              data-aos-delay={`${(index + 1) * 100}`}
              data-aos-once="false" // Allow this element to re-animate
            />
          ))}
        </div>
      </div>
    </>
  );
}
