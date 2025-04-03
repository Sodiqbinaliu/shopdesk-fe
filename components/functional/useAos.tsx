"use client";

import Aos from "aos";
import { useEffect } from "react";

export default function useAos() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-out",
      once: false, // Allow animations to replay
      offset: 100,
    });
  }, []);
}
