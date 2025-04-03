"use client";
import Features from "@/components/functional/Features";
import Hero from "@/components/functional/Hero";
import Works from "@/components/functional/Works";
import Testimonials from "@/components/functional/testimonials";
import useAos from "@/components/functional/useAos";
import "aos/dist/aos.css";

export default function Home() {
  useAos();
  const ShopDeskFeatures: React.FC = () => {
    return (
      <section>
        <Hero />
        <Features />
        <div data-aos="fade-up" data-aos-once="false">
          <Works />
        </div>
        <div data-aos="fade-up" data-aos-once="false">
          <Testimonials />
        </div>
      </section>
    );
  };

  return <ShopDeskFeatures />;
}
