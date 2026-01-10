"use client";
import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import Container from "@/components/common/Container";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyCheckAlt,
  FaUser,
} from "react-icons/fa";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { getServiceById } from "@/services/services.details";
import { booking } from "@/services/services.bookings";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const BookingPage = () => {
  const [service, setService] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const { id } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session?.user);
  const isAdmin = session?.user?.role === "admin";


  useEffect(() => {
    if (status === "unauthenticated") {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to book this service.",
        confirmButtonText: "Go to Login",
      }).then(() => {
        // router.push(`/login?callbackUrl=/booking/${id}`);
      });
    }
  }, [status, router]);

  // Fetch Service Details
  useEffect(() => {
    if (id) {
      getServiceById(id).then((data) => setService(data));
    }
  }, [id]);

  // Fetch Location Data (warehouses.json)
  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => setLocationData(data))
      .catch((err) => console.error("Location fetch error ❌", err));
  }, []);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      userName: session?.user?.name || "", // ইউজার নেম অটো ফিল হতে পারে
      bookingDate: "",
      planType: "hourly",
      duration: 1,
      region: "",
      district: "",
      area: "",
      status: "pending",
    },
  });

  // Form Watchers
  const watchedRegion = useWatch({ control, name: "region" });
  const watchedDistrict = useWatch({ control, name: "district" });
  const watchedPlanType = useWatch({ control, name: "planType" });
  const watchedDuration = useWatch({ control, name: "duration" });

  // Location Logic
  const uniqueRegions = [...new Set(locationData.map((item) => item.region))];
  const districts = locationData.filter(
    (item) => item.region === watchedRegion
  );
  const selectedDistrictObj = districts.find(
    (item) => item.district === watchedDistrict
  );
  const areas = selectedDistrictObj ? selectedDistrictObj.covered_area : [];

  // Price Calculation
  const hourlyPrice = service?.pricePerHour || 0;
  const dailyPrice = service?.pricePerDay || 0;
  const totalCost =
    watchedPlanType === "hourly"
      ? hourlyPrice * (watchedDuration || 0)
      : dailyPrice * (watchedDuration || 0);

  const onSubmit = async (data) => {
    if (isAdmin) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "Admins are not allowed to place bookings.",
      });
      return;
    }

    const formData = {
      ...data,
      totalCost,
      serviceName: service?.name,
      email: session?.user?.email,
      image: service?.image,
    };

    try {
      const res = await booking(formData);
      if (res.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Booking Submitted!",
          text: "Your booking has been successfully submitted.",
        });
        router.push("/dashboard/my-bookings");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  if (!service)
    return <div className="py-20 text-center">Loading Service Details...</div>;

  return (
    <section className="py-16 bg-base-100">
      <Container>
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral">
            Book <span className="text-primary">{service?.name}</span>
          </h1>
          {isAdmin && (
            <div className="alert alert-error mt-4 rounded-xl max-w-md mx-auto md:mx-0">
              <span>Admin accounts cannot place bookings.</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-300"
            >
              {/* Personal Information */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6 text-primary font-bold">
                  <FaUser /> <span>Personal Information</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label text-xs font-bold uppercase opacity-60">
                      Full Name
                    </label>
                    <input
                      {...register("userName")}
                      className="input input-bordered rounded-xl bg-base-200 border-none"
                      required
                      disabled={isAdmin}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label text-xs font-bold uppercase opacity-60">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      {...register("bookingDate")}
                      className="input input-bordered rounded-xl bg-base-200 border-none"
                      required
                      disabled={isAdmin}
                    />
                  </div>
                </div>
              </div>

              {/* Service Duration */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6 text-primary font-bold">
                  <FaClock /> <span>Service Duration</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label text-xs font-bold uppercase opacity-60">
                      Plan Type
                    </label>
                    <select
                      {...register("planType")}
                      className="select select-bordered rounded-xl bg-base-200 border-none"
                      disabled={isAdmin}
                    >
                      <option value="hourly">Hourly Basis</option>
                      <option value="daily">Daily Basis</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label text-xs font-bold uppercase opacity-60">
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
                      disabled={isAdmin}
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6 text-accent font-bold">
                  <FaMapMarkerAlt /> <span>Service Location</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    {...register("region")}
                    className="select select-bordered rounded-xl bg-base-200 border-none"
                    required
                    disabled={isAdmin}
                  >
                    <option value="">Select Division</option>
                    {uniqueRegions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>

                  <select
                    {...register("district")}
                    className="select select-bordered rounded-xl bg-base-200 border-none"
                    disabled={!watchedRegion || isAdmin}
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.district} value={d.district}>
                        {d.district}
                      </option>
                    ))}
                  </select>

                  <select
                    {...register("area")}
                    className="select select-bordered rounded-xl bg-base-200 border-none"
                    disabled={!watchedDistrict || isAdmin}
                    required
                  >
                    <option value="">Select Area</option>
                    {areas.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>

                  <input
                    {...register("zip")}
                    placeholder="Zip Code"
                    className="input input-bordered rounded-xl bg-base-200 border-none"
                    disabled={isAdmin}
                  />

                  <textarea
                    {...register("address")}
                    className="textarea textarea-bordered rounded-xl bg-base-200 border-none md:col-span-2"
                    placeholder="Street details..."
                    rows="2"
                    required
                    disabled={isAdmin}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAdmin}
                className={`btn btn-lg w-full rounded-2xl text-white font-bold ${
                  isAdmin ? "btn-disabled bg-gray-400" : "btn-primary"
                }`}
              >
                {isAdmin ? "Admin Booking Not Allowed" : "Confirm Booking"}
              </button>
            </form>
          </div>

          {/* Sticky Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-[2.5rem] overflow-hidden shadow-2xl border border-base-200 sticky top-24">
              <div className="relative h-48 w-full">
                <Image
                  src={service?.image || "/placeholder.png"}
                  alt={service?.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4">{service?.name}</h3>
                <div className="flex justify-between border-b pb-4 text-sm opacity-70">
                  <span>Rate ({watchedPlanType})</span>
                  <span>
                    ${watchedPlanType === "hourly" ? hourlyPrice : dailyPrice}
                  </span>
                </div>
                <div className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold">Total Cost</span>
                    <span className="text-3xl font-black text-primary">
                      ${totalCost}
                    </span>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-2xl flex gap-3">
                    <FaMoneyCheckAlt className="text-accent text-xl" />
                    <p className="text-[11px] text-accent font-medium">
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
