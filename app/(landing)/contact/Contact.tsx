"use client";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ContactHeader } from "./components/ContactHeader";
import { ContactForm } from "./components/ContactForm";
import { ContactInfoSection } from "./components/ContactInfoSection";

const Contact = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      mirror: false
    });
  }, []);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);

    if (value.length < 10) {
      setErrors("Phone number must be at least 10 digits");
    } else {
      setErrors("");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <ContactHeader 
        title={<p>We'd <span className='text-green-500'>Love</span> to hear from you</p>}
        subtitle="Have questions or need assistance? Reach out to us, and we will be happy to help."
      />

      <section 
        className="grid lg:grid-cols-[60%_40%] gap-8 md:gap-12 lg:gap-16 mt-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <ContactForm 
          phoneNumber={phoneNumber}
          errors={errors}
          onPhoneNumberChange={handlePhoneNumberChange}
        />

        <ContactInfoSection />
      </section>
    </div>
  );
};

export default Contact;