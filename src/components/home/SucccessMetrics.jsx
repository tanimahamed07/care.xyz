"use client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const SuccessMetrics = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
    >
      {/* Card 1 */}
      <div className="bg-base-200/50 p-8 rounded-3xl text-center border border-base-300">
        <h3 className="text-3xl md:text-4xl font-black text-primary italic">
          {inView && <CountUp end={10} duration={3} />}k+
        </h3>
        <p className="text-[10px] md:text-xs uppercase font-bold text-neutral/40 tracking-widest mt-2">
          Families Served
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-base-200/50 p-8 rounded-3xl text-center border border-base-300">
        <h3 className="text-3xl md:text-4xl font-black text-accent italic">
          {inView && <CountUp end={500} duration={3} />}+
        </h3>
        <p className="text-[10px] md:text-xs uppercase font-bold text-neutral/40 tracking-widest mt-2">
          Verified Caregivers
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-base-200/50 p-8 rounded-3xl text-center border border-base-300">
        <h3 className="text-3xl md:text-4xl font-black text-primary italic">
          {inView && <CountUp end={4.9} duration={3} decimals={1} />}/5
        </h3>
        <p className="text-[10px] md:text-xs uppercase font-bold text-neutral/40 tracking-widest mt-2">
          Average Rating
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-base-200/50 p-8 rounded-3xl text-center border border-base-300">
        <h3 className="text-3xl md:text-4xl font-black text-accent italic">
          {inView && <CountUp end={24} duration={3} />}/7
        </h3>
        <p className="text-[10px] md:text-xs uppercase font-bold text-neutral/40 tracking-widest mt-2">
          Support Active
        </p>
      </div>
    </div>
  );
};

export default SuccessMetrics;
