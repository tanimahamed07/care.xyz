"use client";
import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import Container from "@/components/common/Container";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyCheckAlt,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getServiceById } from "@/services/services.details";
import { booking } from "@/services/services.bookings";
import Swal from "sweetalert2";

const BookingPage = ({ params }) => {
  const [service, setService] = useState();
  const { id } = useParams();

  useEffect(() => {
    getServiceById(id).then((service) => setService(service));
  }, [id]);

  const [locationData, setLocationData] = useState([]);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      userName: "",
      bookingDate: "",
      planType: "hourly",
      duration: 1,
      region: "",
      district: "",
      area: "",
      status: "pending",
    },
  });

  const watchedRegion = useWatch({ control, name: "region" });
  const watchedDistrict = useWatch({ control, name: "district" });
  const watchedPlanType = useWatch({ control, name: "planType" });
  const watchedDuration = useWatch({ control, name: "duration" });

  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        setLocationData(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Location fetch error ❌", err));
  }, []);

  const uniqueRegions = [...new Set(locationData.map((item) => item.region))];
  const districts = locationData.filter(
    (item) => item.region === watchedRegion
  );
  const selectedDistrictObj = districts.find(
    (item) => item.district === watchedDistrict
  );
  const areas = selectedDistrictObj ? selectedDistrictObj.covered_area : [];

  const hourlyPrice = service?.pricePerHour || 0;
  const dailyPrice = service?.pricePerDay || 0;
  const totalCost =
    watchedPlanType === "hourly"
      ? hourlyPrice * (watchedDuration || 0)
      : dailyPrice * (watchedDuration || 0);

  const onSubmit = (data) => {
    const formData = { ...data, totalCost, serviceName: service?.name };
    console.log("Final Booking Data:", formData);

    booking(formData)
      .then((res) => {
        if (res.acknowledged === true) {
          Swal.fire({
            icon: "success",
            title: "Booking Submitted!",
            text: "Your booking has been successfully submitted.",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "Something went wrong. Please try again.",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <section className="py-16 bg-base-100">
      <Container>
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral">
            Book <span className="text-primary">{service?.name}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-300"
            >
              {/* Personal Details Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6 text-primary font-bold">
                  <FaUser /> <span>Personal Information</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label text-xs font-bold uppercase text-neutral/50">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register("userName")}
                      placeholder="Enter your name"
                      className="input input-bordered rounded-xl bg-base-200 border-none"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label text-xs font-bold uppercase text-neutral/50">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      {...register("bookingDate")}
                      className="input input-bordered rounded-xl bg-base-200 border-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Duration Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6 text-primary font-bold">
                  <FaClock /> <span>Service Duration</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label text-xs font-bold uppercase text-neutral/50">
                      Plan Type
                    </label>
                    <select
                      {...register("planType")}
                      className="select select-bordered rounded-xl bg-base-200 border-none"
                    >
                      <option value="hourly">Hourly Basis</option>
                      <option value="daily">Daily Basis</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label text-xs font-bold uppercase text-neutral/50">
                      {watchedPlanType === "hourly"
                        ? "Number of Hours"
                        : "Number of Days"}
                    </label>
                    <input
                      type="number"
                      min="1"
                      {...register("duration")}
                      className="input input-bordered rounded-xl bg-base-200 border-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6 text-accent font-bold">
                  <FaMapMarkerAlt /> <span>Service Location</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <select
                      {...register("region")}
                      className="select select-bordered rounded-xl bg-base-200 border-none"
                      required
                    >
                      <option value="">Select Division</option>
                      {uniqueRegions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <select
                      {...register("district")}
                      className="select select-bordered rounded-xl bg-base-200 border-none"
                      disabled={!watchedRegion}
                      required
                    >
                      <option value="">Select District</option>
                      {districts.map((d) => (
                        <option key={d.district} value={d.district}>
                          {d.district}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <select
                      {...register("area")}
                      className="select select-bordered rounded-xl bg-base-200 border-none"
                      disabled={!watchedDistrict}
                      required
                    >
                      <option value="">Select Area</option>
                      {areas.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    {...register("zip")}
                    placeholder="Zip Code"
                    className="input input-bordered rounded-xl bg-base-200 border-none"
                  />

                  <textarea
                    {...register("address")}
                    className="textarea textarea-bordered rounded-xl bg-base-200 border-none md:col-span-2"
                    placeholder="House no, Flat, Street details..."
                    rows="2"
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-full rounded-2xl text-white font-bold transition-transform hover:scale-[1.02]"
              >
                Confirm Booking
              </button>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-[2.5rem] overflow-hidden shadow-2xl border border-base-200 sticky top-24">
              <div className="relative h-48 w-full">
                <Image
                  src={service?.image || "/placeholder.png"}
                  alt={service?.name || "Service image"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-neutral mb-4">
                  {service?.name}
                </h3>
                <div className="space-y-4 border-b border-base-200 pb-6">
                  <div className="flex justify-between text-sm italic text-neutral/60">
                    <span>Rate ({watchedPlanType})</span>
                    <span>
                      ${watchedPlanType === "hourly" ? hourlyPrice : dailyPrice}
                    </span>
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-neutral">
                      Total Cost
                    </span>
                    <span className="text-3xl font-black text-primary">
                      ${totalCost}
                    </span>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-2xl border border-accent/10 flex gap-3">
                    <FaMoneyCheckAlt className="text-accent text-xl shrink-0" />
                    <p className="text-[11px] text-accent/80">
                      Pay securely after service confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BookingPage;
