import React from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import {
  FaClock,
  FaCalendarDay,
  FaCheckCircle,
  FaArrowRight,
  FaTag,
} from "react-icons/fa";
import Link from "next/link";
import { getServiceById } from "@/services/services.details";

const ServiceDetails = async ({ params }) => {
  const { id } = await params;
  const service = await getServiceById(id);

  console.log("service======>", service);
  if (!service)
    return <div className="py-20 text-center">Service not found!</div>;

  return (
    <section className="min-h-screen bg-base-100 pb-20 pt-10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-[300px] md:h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-base-200">
              <Image
                src={service.image}
                alt={service.name}
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Content Card */}
            <div className="bg-base-100 p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-base-200">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-6">
                <FaTag className="text-xs" /> {service.category}
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-neutral mb-6">
                {service.name}
              </h1>

              <p className="text-lg text-neutral/70 leading-relaxed mb-10">
                {service.description}
              </p>

              <h3 className="text-2xl font-bold text-neutral mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                Key Features
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-base-200/50 border border-base-300/50 hover:border-primary/30 transition-all"
                  >
                    <FaCheckCircle className="text-primary shrink-0" />
                    <span className="font-medium text-neutral/80">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-10 bg-base-100 p-8 rounded-[2.5rem] shadow-2xl shadow-primary/10 border border-primary/10">
              <h3 className="text-2xl font-bold text-neutral mb-8">
                Service Pricing
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-5 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <FaClock />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral/40 uppercase">
                        Hourly
                      </p>
                      <p className="text-xl font-black text-neutral">
                        ${service.pricePerHour}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 rounded-2xl bg-accent/5 border border-accent/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      <FaCalendarDay />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral/40 uppercase">
                        Daily
                      </p>
                      <p className="text-xl font-black text-neutral">
                        ${service.pricePerDay}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link
                  href={`/booking/${id}`}
                  className="btn btn-primary btn-lg w-full rounded-2xl text-white font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group border-none"
                >
                  Book This Service
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-center text-[11px] text-neutral/40 font-medium px-4">
                  * Final cost will be calculated based on your selected
                  duration.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-base-200 space-y-4">
                <div className="flex items-center gap-3 text-sm text-neutral/60">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  Verified Caregivers Only
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral/60">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  24/7 Support Assistance
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceDetails;
