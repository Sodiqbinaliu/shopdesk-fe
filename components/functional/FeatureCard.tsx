import Image from "next/image";
import Link from "next/link";
import React from "react";
import right from "@/public/icons/right.svg";
import useAos from "./useAos";
import "aos/dist/aos.css";
interface FeatureCardProps {
  feature: {
    iconSrc: string;
    title: string;
    description: string;
    buttonText: string;
    bgColor: string;
  };
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  useAos();
  const { iconSrc, title, description, buttonText, bgColor } = feature;
  return (
    <div
      className={`rounded-[20px] flex flex-1 min-w-[300px] max-w-[400px] flex-col justify-between gap-5 items-start p-4 ${bgColor}`}
      data-aos="fade-up"
      data-aos-delay="100"
      data-aos-once="false" // Allow this element to re-animate
    >
      <Image
        src={iconSrc}
        alt={title}
        width={32}
        height={32}
        className="w-8 h-8 mb-4 mt-2.5"
      />
      <h3 className="text-2xl leading-6 font-medium text-gray-900">{title}</h3>
      <p className="text-gray-700 text-lg leading-6 font-circular-light">
        {description}
      </p>

      <Link className="flex items-center gap-2" href="/sign-up">
        <button className="w-full cursor-pointer font-medium flex items-center text-left md:text-base text-sm ">
          {buttonText}
        </button>
        <Image
          src={right}
          width={14}
          height={14}
          alt="Arrow Right"
          className="w-3.5 h-3.5 cursor-pointer"
        />
      </Link>
    </div>
  );
}
