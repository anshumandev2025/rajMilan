import Footer from "@/components/Footer";
import { Featured } from "@/components/homePage/Featured";
import Hero from "@/components/homePage/Hero";
import Join from "@/components/homePage/Join";
import Navbar from "@/components/homePage/Navbar";
import Testimonials from "@/components/homePage/Testimonials";
import React from "react";
const page = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <Featured />
      <Testimonials />
      <Join />
      <Footer />
    </div>
  );
};

export default page;
