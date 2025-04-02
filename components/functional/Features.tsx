"use client";
import React from "react";
import Desktop2 from "@/public/icons/Desktop 2.png";
import Check from "@/public/icons/check.png";
import Desktopsm from "@/public/icons/desktopsm.png";
import Play from "@/public/icons/play.png";
import Image from "next/image";
import FeatureCard from "./FeatureCard";
import useAos from "./useAos";
import "aos/dist/aos.css";
export default function Features() {
  useAos();
  const features = [
    {
      iconSrc: "/icons/stock.svg",
      title: "Smart Stock Management",
      description:
        "Track stock in real-time and manage your products with confidence and precision. Our easy to use stock inventory solution helps you track and organize all your products all in real time.",
      buttonText: "Get Instant Business Insights",
      bgColor: "bg-blue-50",
    },
    {
      iconSrc: "/icons/note.svg",
      title: "Easy Sales Tracking",
      description:
        "Process transactions quickly, sync and update your inventory with every transaction that supports cash, card, and online payments for a fast checkout experience. ",
      buttonText: "Get Access To Sales Insights",
      bgColor: "bg-rose-50",
    },
    {
      iconSrc: "/icons/delete.svg",
      title: "Custom Reports & Insights",
      description:
        "Make smarter decisions with detailed sales and inventory reports. Monitor your revenue, identify best-selling products, and trends all in one dashboard.",
      buttonText: "Get Instant Business Insights",
      bgColor: "bg-yellow-50",
    },
  ];
  return (
    <>
      <div
        id="features"
        className="mx-auto max-w-[1198px] px-5 min-[600px]:px-10 pt-12"
      >
        <h2
          className="text-center py-4 md:py-3 font-medium leading-6 text-[#009A49]"
          data-aos="fade-up"
          data-aos-once="false" // Allow this element to re-animate
        >
          Key Features
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div
            className="flex flex-col gap-8 min-w-[300px]"
            data-aos="fade-right"
            data-aos-once="false" // Allow this element to re-animate
          >
            <div className="gap-2">
              <span className="text-sm leading-5 text-[#19A45B] mt-3 font-normal">
                Stock Inventory
              </span>

              <h1 className="md:text-[54px] text-4xl font-bold leading-16">
                Inventory
              </h1>

              <p className="text-gray-600 text-base font-light max-w-[512px]">
                Manage your inventory with confidence and precision. Our
                intuitive stock inventory solution helps you track, organize,
                and optimize your products all in real time.
              </p>
            </div>

            <ul className="flex-col gap-6 leading-6 hidden md:flex">
              <li
                className="flex items-center gap-2 text-base"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-once="false" // Allow this element to re-animate
              >
                <span>
                  <Image src={Check} height={24} width={24} alt="" />
                </span>
                Real-Time Stock Tracking
              </li>
              <li
                className="flex items-center gap-2 text-base"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-once="false" // Allow this element to re-animate
              >
                <span>
                  <Image src={Check} height={24} width={24} alt="" />
                </span>
                Effortless Organization
              </li>
              <li
                className="flex items-center gap-2 text-base"
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-once="false" // Allow this element to re-animate
              >
                <span>
                  <Image src={Play} height={24} width={24} alt="" />
                </span>
                Streamline Your Inventory Now
              </li>
            </ul>
          </div>

          <div
            className="w-full max-w-[622px] bg-[#FAFAFA] p-2 pt-5 pr-0 hidden md:block"
            data-aos="fade-left"
            data-aos-once="false" // Allow this element to re-animate
          >
            <Image
              src={Desktop2}
              alt="Desktop"
              className="flex-1 overflow-hidden"
            />
          </div>

          <div className="w-full max-w-[450px] mt-4 flex flex-col items-center p-1 rounded-3xl md:hidden">
            <div
              className="bg-[#FAFAFA] pt-1.5 px-1.5 pb-0 rounded-tl-3xl rounded-tr-3xl w-full"
              data-aos="fade-up"
              data-aos-once="false" // Allow this element to re-animate
            >
              <Image
                src={Desktopsm}
                alt="Desktop"
                className="overflow-hidden h-[201px]"
              />
            </div>

            <ul className="flex flex-col gap-6 text-base leading-6 md:hidden pt-8 self-start">
              <li
                className="flex items-center gap-2"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-once="false" // Allow this element to re-animate
              >
                <span>
                  <Image src={Check} height={24} width={24} alt="" />
                </span>
                Automated Alerts
              </li>
              <li
                className="flex items-center gap-2"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-once="false" // Allow this element to re-animate
              >
                <span>
                  <Image src={Check} height={24} width={24} alt="" />
                </span>
                Comprehensive Reporting
              </li>
              <li
                className="flex items-center gap-2"
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-once="false" // Allow this element to re-animate
              >
                <span>
                  <Image src={Play} height={24} width={24} alt="" />
                </span>
                Streamline Your Inventory Now
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="mx-auto max-w-[1198px] py-10 px-8"
        data-aos="fade-up"
        data-aos-once="false" // Allow this element to re-animate
      >
        <div className="flex items-stretch justify-center gap-4 flex-wrap">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </>
  );
}
