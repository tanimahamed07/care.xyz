
import React from "react";
import Container from "../common/Container";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import Image from "next/image";
import SuccessMetrics from "./SucccessMetrics";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jasmine",
    role: "Working Mother",
    image: "https://i.pravatar.cc/150?u=sarah",
    review:
      "Care.xyz has been a lifesaver for my family. Finding a verified babysitter was so easy and the service was professional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahat Chowdhury",
    role: "Son of Elderly Parent",
    image: "https://i.pravatar.cc/150?u=rahat",
    review:
      "The elderly care service is top-notch. The caregiver was very compassionate and well-trained. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Mousumi Akter",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?u=mousumi",
    review:
      "The booking process is seamless and the dynamic cost calculation helps me plan my budget easily. Great UI!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-base-100">
      <Container>
        {/* Header Part */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral leading-tight">
              What Our{" "}
              <span className="text-primary italic">Happy Clients</span> Say
            </h2>
            <p className="text-neutral/60 mt-4">
              Join thousands of families who trust Care.xyz for their loved
              ones' safety and well-being.
            </p>
          </div>

          {/* Navigation Arrows - Desktop Only */}
          <div className="hidden md:flex gap-2">
            <div className="w-12 h-12 rounded-full border border-base-300 flex items-center justify-center text-neutral/40 hover:bg-primary hover:text-white transition-all cursor-pointer">
              ←
            </div>
            <div className="w-12 h-12 rounded-full border border-base-300 flex items-center justify-center text-neutral/40 hover:bg-primary hover:text-white transition-all cursor-pointer">
              →
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-base-200/40 p-8 rounded-[2.5rem] border border-transparent transition-all duration-300 hover:bg-base-100 hover:shadow-2xl hover:shadow-primary/10 hover:border-base-300 group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} className="text-warning text-sm" />
                  ))}
                </div>
                <FaQuoteLeft className="text-primary/20 text-3xl group-hover:text-primary transition-colors" />
              </div>

              <p className="text-neutral/70 italic leading-relaxed mb-8">
                {item.review}
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-neutral">{item.name}</h4>
                  <p className="text-[10px] text-neutral/40 font-bold uppercase tracking-widest">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SuccessMetrics />
      </Container>
    </section>
  );
};

export default Testimonials;
