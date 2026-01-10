"use client";

import React from "react";
import Container from "../common/Container";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Image from "next/image";
import SuccessMetrics from "./SucccessMetrics";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
      "The booking process is seamless and the dynamic cost calculation helps me plan my budget easily. Great UI! This service is truly unique in Bangladesh.",
    rating: 5,
  },
  {
    id: 4,
    name: "Anika Rahman",
    role: "Teacher",
    image: "https://i.pravatar.cc/150?u=anika",
    review:
      "Excellent support and very reliable. I feel safe leaving my kids with their professionals.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-base-100 overflow-hidden">
      <Container>
        {/* Header */}
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

          {/* Swiper Navigation */}
          <div className="hidden md:flex gap-2">
            <button className="swiper-prev-custom w-12 h-12 rounded-full border border-base-300 flex items-center justify-center text-neutral/40 hover:bg-primary hover:text-white transition-all cursor-pointer">
              <FaChevronLeft />
            </button>
            <button className="swiper-next-custom w-12 h-12 rounded-full border border-base-300 flex items-center justify-center text-neutral/40 hover:bg-primary hover:text-white transition-all cursor-pointer">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
        
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
          navigation={{
            prevEl: ".swiper-prev-custom",
            nextEl: ".swiper-next-custom",
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="">
            <div
                className="bg-base-200/40 p-6 rounded-[2rem] border border-transparent 
                transition-all duration-300 hover:bg-base-100 hover:shadow-2xl hover:shadow-primary/10 
                hover:border-base-300 group flex flex-col w-full min-h-[250px]"
              >
                {/* Rating + Quote Icon */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} className="text-warning text-[12px]" />
                    ))}
                  </div>
                  <FaQuoteLeft className="text-primary/20 text-2xl group-hover:text-primary transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-neutral/70 italic text-sm leading-snug mb-4">
                  {item.review}
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="relative w-10 h-10 overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral text-sm leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[9px] text-neutral/40 font-bold uppercase tracking-widest mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <SuccessMetrics />
      </Container>
    </section>
  );
};

export default Testimonials;
