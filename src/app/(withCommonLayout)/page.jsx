import AboutSection from "@/components/home/AboutSection";
import Banner from "@/components/home/Banner";
import ServicesOverview from "@/components/home/ServiceOverView";
import ServicesOverviewSkeleton from "@/components/home/ServicesOverviewSkeleton";
import Testimonials from "@/components/home/Testimonials";
import React, { Suspense } from "react";

const Homepage = () => {
  return (
    <section>
      <Banner />
      <AboutSection></AboutSection>
      <Suspense fallback={<ServicesOverviewSkeleton />}>
        <ServicesOverview />
      </Suspense>
      <Testimonials></Testimonials>
    </section>
  );
};

export default Homepage;
