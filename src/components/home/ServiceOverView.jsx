import React from "react";
import Container from "../common/Container";
import ServiceCard from "../common/ServiceCard";
import { getAllServices } from "@/services/services.service";
import ServicesOverviewSkeleton from "./ServicesOverviewSkeleton";
import Link from "next/link";

const ServicesOverview = async () => {
  const services = await getAllServices();


  if (!services || services.length === 0) {
    return <ServicesOverviewSkeleton />;
  }

  return (
    <section className="py-20 bg-base-100">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
              Available Services
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral leading-tight">
              Our <span className="text-primary italic">Expert</span> Care
              Services
            </h2>
            <p className="text-neutral/60 mt-4 max-w-xl">
              Choose the best professional care for your family members with
              flexible scheduling and verified experts.
            </p>
          </div>
          <Link href={'/services'} className="btn btn-outline border-2 border-primary text-primary hover:bg-primary hover:border-primary hover:text-white rounded-xl px-8 hidden md:flex transition-all">
            View All Services
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard service={service} key={index} />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 md:hidden">
          <button className="btn btn-primary btn-outline w-full rounded-2xl">
            View All Services
          </button>
        </div>
      </Container>
    </section>
  );
};

export default ServicesOverview;
