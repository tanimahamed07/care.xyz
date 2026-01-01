"use client";

import { bookingDelete, getBookingById } from "@/services/services.bookings";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaTag,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]); // start with empty array

  const { data: session } = useSession();
  console.log("============>", session?.user?.email);
  useEffect(() => {
    if (!session?.user?.email) return; // wait for session to load

    const fetchBooking = async () => {
      const data = await getBookingById(session.user.email);
      setBookings(data);
    };

    fetchBooking();
  }, [session?.user?.email]);
  console.log(bookings);

  const handleDelete = async (id) => {
    try {
      const result = await bookingDelete(id);
      if (result) {
        console.log(result.acknowledged);
        setBookings(bookings.filter((b) => b._id !== id));
      } else {
        console.error("Failed to delete:", res.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <span className="badge badge-warning gap-1 font-bold py-3 px-4 text-xs uppercase tracking-wider">
            <FaHourglassHalf /> Pending
          </span>
        );
      case "confirmed":
        return (
          <span className="badge badge-info gap-1 font-bold py-3 px-4 text-xs uppercase tracking-wider">
            <FaCheckCircle /> Confirmed
          </span>
        );
      case "completed":
        return (
          <span className="badge badge-success gap-1 font-bold py-3 px-4 text-xs uppercase tracking-wider text-white">
            <FaCheckCircle /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="badge badge-error gap-1 font-bold py-3 px-4 text-xs uppercase tracking-wider text-white">
            <FaTimesCircle /> Cancelled
          </span>
        );
      default:
        return (
          <span className="badge badge-ghost font-bold py-3 px-4 text-xs uppercase tracking-wider">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral">
            My <span className="text-primary italic">Bookings</span>
          </h1>
          <p className="text-neutral/60 text-sm mt-1 tracking-wide">
            Track and manage your scheduled care services.
          </p>
        </div>
        <div className="bg-primary/10 border border-primary/20 px-6 py-3 rounded-2xl">
          <span className="text-primary font-bold block text-sm uppercase tracking-tighter">
            Total Active Orders
          </span>
          <span className="text-2xl font-black text-primary">
            {bookings.length}
          </span>
        </div>
      </div>

      {/* Bookings Table / Card View */}
      <div className="overflow-x-auto bg-base-100 rounded-3xl border border-base-200 shadow-sm">
        <div className="overflow-x-auto w-full">
          {" "}
          {/* Parent wrapper for responsiveness */}
          <table className="table table-zebra w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-base-200/50">
              <tr className="text-neutral font-bold text-sm uppercase tracking-wider border-b border-base-200">
                <th className="py-5 whitespace-nowrap">Service Details</th>
                <th className="whitespace-nowrap">Schedule</th>
                <th className="whitespace-nowrap">Location</th>
                <th className="whitespace-nowrap text-center">Total Cost</th>
                <th className="whitespace-nowrap text-center">Status</th>
                <th className="text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-primary/5 transition-colors group"
                >
                  <td className="py-6 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-primary/10 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={booking?.image || "/placeholder.jpg"}
                          alt={booking.serviceName}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-black text-neutral text-base">
                          {booking.serviceName}
                        </div>
                        <div className="text-xs text-neutral/40 font-medium">
                          ID: #{booking._id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-semibold text-neutral/80">
                        <FaCalendarAlt className="text-primary text-xs" />{" "}
                        {booking.bookingDate}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral/50">
                        <FaClock className="text-accent text-xs" />{" "}
                        {booking.duration} Hours ({booking.planType})
                      </div>
                    </div>
                  </td>

                  <td>
                    {/* Location section should have some width but not wrap too early */}
                    <div className="flex items-start gap-2 min-w-[180px]">
                      <FaMapMarkerAlt className="text-error mt-1 text-xs shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-neutral/80 leading-none mb-1">
                          {booking.area}, {booking.district}
                        </p>
                        <p className="text-[11px] text-neutral/50 truncate max-w-[150px]">
                          {booking.address}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1 font-black text-lg text-primary whitespace-nowrap">
                      <span className="text-xs font-bold text-neutral/40">
                        BDT
                      </span>
                      {booking.totalCost}
                    </div>
                  </td>

                  <td className="text-center">
                    <div className="flex justify-center">
                      {getStatusBadge(booking.status)}
                    </div>
                  </td>

                  <th className="text-right whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="text-error font-bold hover:underline transition-all"
                    >
                      Cancel Booking
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Empty State (Optional) */}
        {bookings.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTag className="text-3xl text-neutral/20" />
            </div>
            <h3 className="text-xl font-bold text-neutral">
              No Bookings Found
            </h3>
            <p className="text-neutral/50">
              You haven't booked any services yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
