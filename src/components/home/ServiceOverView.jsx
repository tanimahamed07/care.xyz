import React from "react";
import Container from "../common/Container";
import ServiceCard from "../common/ServiceCard";


const services = [
  {
    id: 1,
    name: "Newborn Care",
    category: "Baby Care",
    image: "https://i.ibb.co/9q2qFvG/baby-care.jpg",
    shortDescription: "Professional care for your newborn baby at your home.",
    pricePerHour: 12,
    pricePerDay: 70,
  },
  {
    id: 1,
    name: "Newborn Care",
    category: "Baby Care",
    image: "https://i.ibb.co/9q2qFvG/baby-care.jpg",
    shortDescription: "Professional care for your newborn baby at your home.",
    pricePerHour: 12,
    pricePerDay: 70,
  },
  {
    id: 1,
    name: "Newborn Care",
    category: "Baby Care",
    image: "https://i.ibb.co/9q2qFvG/baby-care.jpg",
    shortDescription: "Professional care for your newborn baby at your home.",
    pricePerHour: 12,
    pricePerDay: 70,
  },
];

const ServicesOverview = () => {
  return (
    <section className="py-20 bg-base-100">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              Available Services
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral leading-tight">
              Our <span className="text-primary italic">Expert</span> Care Services
            </h2>
            <p className="text-neutral/60 mt-4 max-w-xl">
              Choose the best professional care for your family members with 
              flexible scheduling and verified experts.
            </p>
          </div>
          <button className="btn btn-outline border-2 border-primary text-primary hover:bg-primary hover:border-primary rounded-xl px-8 hidden md:flex transition-all">
            View All Services
          </button>
        </div>

        {/* Services Grid - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
           <ServiceCard service={service} key={index}></ServiceCard>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 md:hidden">
            <button className="btn btn-primary btn-outline w-full rounded-2xl">View All Services</button>
        </div>
      </Container>
    </section>
  );
};

export default ServicesOverview;