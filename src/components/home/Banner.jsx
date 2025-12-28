import React from "react";
import Image from "next/image";
import Container from "../common/Container";

const Banner = () => {
  return (
    <section className="bg-base-100">
      <Container>
        <div className=" py-12 flex flex-col-reverse md:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
              Trusted Care Platform
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-primary">
              Care<span className="text-accent">.xyz</span> <br />
              <span className="text-neutral">Care Services You Can Trust</span>
            </h1>

            <p className="text-neutral/70 mb-10 text-lg md:text-xl leading-relaxed">
              Easily find and book reliable caregivers for children, elderly, or
              special care at home. Safe, simple, and accessible for everyone.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <a
                href="/services"
                className="px-8 py-4 bg-primary text-primary-content rounded-xl font-bold text-lg shadow-md transition hover:shadow-xl hover:scale-105"
              >
                Book a Service
              </a>

              <a
                href="#about"
                className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-bold text-lg transition hover:bg-primary hover:text-primary-content"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full h-80 md:h-96 lg:h-[28rem]">
              <Image
                src="https://healthcaresnapshots.com/wp-content/uploads/sites/5/2019/09/southington-care-center-reception-area-and-nurses-station-renovations-6-1050x750.jpg"
                alt="Caregiving Illustration"
                fill
                className="object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
