import AboutSection from "@/components/home/AboutSection";
import Banner from "@/components/home/Banner";
import ServicesOverview from "@/components/home/ServiceOverView";
import Testimonials from "@/components/home/Testimonials";
import React from "react";

const Homepage = () => {
  return (
    <section>
      <Banner />
      <AboutSection></AboutSection>
      <ServicesOverview></ServicesOverview>
      <Testimonials></Testimonials>
    </section>
  );
};

export default Homepage;
