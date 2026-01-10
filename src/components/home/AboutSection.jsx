import React from "react";
import { FaShieldAlt, FaHandHoldingHeart, FaUserCheck } from "react-icons/fa";
import Container from "../common/Container";
import Link from "next/link";

const AboutSection = () => {
  return (
    <section className=" py-12 bg-base-100">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-base-200 p-6 md:p-8 rounded-3xl border border-base-300 transition-all hover:border-primary/30">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-neutral">
                  Secure Care
                </h4>
                <p className="text-sm text-neutral/60 mt-2">
                  NID verified and background checked caregivers.
                </p>
              </div>

              <div className="bg-base-200 p-6 md:p-8 rounded-3xl border border-base-300 sm:mt-8 transition-all hover:border-accent/30">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
                  <FaUserCheck className="text-2xl" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-neutral">
                  Professional
                </h4>
                <p className="text-sm text-neutral/60 mt-2">
                  Certified experts for elderly and child care.
                </p>
              </div>

              <div className="bg-base-200 p-6 md:p-8 rounded-3xl border border-base-300 sm:-mt-8 transition-all hover:border-primary/30">
                <div className="w-12 h-12 bg-info/10 text-info rounded-xl flex items-center justify-center mb-4">
                  <FaHandHoldingHeart className="text-2xl" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-neutral">
                  Easy Booking
                </h4>
                <p className="text-sm text-neutral/60 mt-2">
                  Dynamic location and cost calculation system.
                </p>
              </div>

              <div className="bg-primary p-6 md:p-8 rounded-3xl text-primary-content flex flex-col justify-center items-center text-center shadow-lg shadow-primary/20 min-h-[150px]">
                <span className="text-3xl md:text-4xl font-black italic">
                  Care
                </span>
                <span className="text-xs md:text-sm font-medium opacity-90 uppercase tracking-widest mt-1">
                  Platform
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
            <div className="space-y-5 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-neutral leading-tight">
                Dedicated to providing{" "}
                <span className="text-primary italic">peace of mind</span> for
                your family.
              </h2>
              <div className="border-l-4 border-error">
                <p className="text-base  md:text-lg text-neutral/70 leading-relaxed max-w-2xl mx-auto px-4 lg:mx-0">
                  At{" "}
                  <span className="font-bold text-2xl text-primary">Care</span>
                  <span className="text-accent">.xyz</span> we understand that
                  finding a trustworthy caregiver is a major decision. Our
                  platform is built to make caregiving **easy, secure, and
                  accessible**.
                </p>
              </div>

              <div className="pt-4 space-y-3 md:space-y-4 text-left">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-base-200/50 lg:bg-transparent hover:bg-base-200 transition-colors border border-transparent hover:border-base-300">
                  <div className="mt-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-neutral/80 font-medium text-sm md:text-base">
                    Reliable care for children, elderly, and sick family
                    members.
                  </p>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-base-200/50 lg:bg-transparent hover:bg-base-200 transition-colors border border-transparent hover:border-base-300">
                  <div className="mt-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-neutral/80 font-medium text-sm md:text-base">
                    Flexible duration and location-based dynamic booking.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/services" className="btn btn-primary w-full sm:w-auto btn-lg rounded-2xl px-10 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
