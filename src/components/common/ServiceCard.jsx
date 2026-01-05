import React from "react";
import { FaArrowRight, FaClock, FaCalendarDay } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ service }) => {
  return (
    <div className="group bg-base-100 border border-base-300 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
      <div className="relative aspect-[4/3] overflow-hidden bg-base-200">
        <Image
          width={400}
          height={300}
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* 🔥 Popular Badge (only if populer === true) */}
        {service.populer && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-gradient-to-r from-primary to-accent text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg tracking-widest uppercase">
              Popular
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-bold bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-lg uppercase shadow-sm">
            {service.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral group-hover:text-primary transition-colors truncate">
          {service.name}
        </h3>

        <p className="text-sm text-neutral/50 line-clamp-2 mt-2 h-10 leading-relaxed">
          {service.shortDescription}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6 py-4 border-t border-base-200">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-primary">
              <FaClock className="text-xs" />
              <span className="text-sm font-bold text-neutral">
                ${service.pricePerHour}
              </span>
            </div>
            <span className="text-[10px] text-neutral/40 font-bold uppercase mt-1">
              Hourly
            </span>
          </div>

          <div className="flex flex-col border-l border-base-200 pl-4">
            <div className="flex items-center gap-1.5 text-accent">
              <FaCalendarDay className="text-xs" />
              <span className="text-sm font-bold text-neutral">
                ${service.pricePerDay}
              </span>
            </div>
            <span className="text-[10px] text-neutral/40 font-bold uppercase mt-1">
              Daily
            </span>
          </div>
        </div>

        <Link
          href={`/services/${service._id}`}
          className="mt-4 w-full py-3 bg-primary/10 text-primary hover:bg-primary hover:text-primary-content rounded-2xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          Details
          <FaArrowRight className="text-xs transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
