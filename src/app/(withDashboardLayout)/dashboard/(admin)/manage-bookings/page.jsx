"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import {
  getAllBookings,
  updateBookingStatus,
} from "@/services/services.bookings";

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [control, setControl] = useState(false);

  useEffect(() => {
    getAllBookings()
      .then((data) => {
        setBookings(data || []);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [control]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateBookingStatus(id, newStatus);
      if (res.modifiedCount > 0) {
        setControl(!control);
        alert("Status updated successfully!");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };
  if (loading)
    return (
      <div className="p-20 text-center font-bold text-primary text-xl animate-pulse">
        Loading Bookings...
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral">
            Manage <span className="text-primary italic">All Bookings</span>
          </h1>
          <p className="text-neutral/60 text-sm mt-1 tracking-wide">
            Care.xyz Admin Control Panel
          </p>
        </div>

        <div className="bg-primary/10 border border-primary/20 px-6 py-3 rounded-2xl">
          <span className="text-primary font-bold block text-sm uppercase tracking-tighter">
            Total Orders
          </span>
          <span className="text-2xl font-black text-primary">
            {bookings.length}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-3xl border border-base-200 shadow-sm">
        <table className="table table-zebra w-full hidden md:table">
          <thead className="bg-base-200/50">
            <tr className="text-neutral font-bold text-sm uppercase tracking-wider border-b">
              <th>User & Service</th>
              <th>Schedule</th>
              <th>Location</th>
              <th className="text-center">Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="hover:bg-primary/5 transition-colors"
              >
                {/* User & Service */}
                <td className="py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-primary/10">
                      <Image
                        src={booking.image || "/placeholder.jpg"}
                        alt="img"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-black text-neutral">
                        {booking.serviceName}
                      </p>
                      <p className="text-xs text-neutral/50 font-bold">
                        <FaUser className="inline mr-1" />
                        {booking.userName}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Schedule */}
                <td className="text-sm font-semibold text-neutral/80">
                  <FaCalendarAlt className="inline text-primary mr-1" />
                  {booking.bookingDate}
                </td>

                {/* Location */}
                <td className="text-sm font-semibold text-neutral/70">
                  <FaMapMarkerAlt className="inline text-error mr-1" />
                  {booking.area}
                </td>

                {/* Status */}
                <td className="text-center">
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase text-white
                  ${
                    booking.status === "confirmed"
                      ? "bg-info"
                      : booking.status === "completed"
                      ? "bg-success"
                      : booking.status === "cancelled"
                      ? "bg-error"
                      : "bg-warning"
                  }`}
                  >
                    {booking.status || "pending"}
                  </span>
                </td>

                {/* Action */}
                <td className="text-right">
                  <div className="dropdown dropdown-left">
                    <button className="text-primary font-bold hover:underline">
                      Update
                    </button>
                    <ul className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-xl w-40 border">
                      <li>
                        <button
                          onClick={() =>
                            handleStatusChange(booking._id, "confirmed")
                          }
                          className="text-info font-bold"
                        >
                          Confirm
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleStatusChange(booking._id, "completed")
                          }
                          className="text-success font-bold"
                        >
                          Complete
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleStatusChange(booking._id, "cancelled")
                          }
                          className="text-error font-bold"
                        >
                          Cancel
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTag className="text-3xl text-neutral/20" />
            </div>
            <h3 className="text-xl font-bold text-neutral">
              No Bookings Found
            </h3>
            <p className="text-neutral/50">No orders available right now.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookingsPage;
