"use client";

import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTag, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";

const MyBookingsPage = () => {
  // আপনার দেওয়া ডেটা স্ট্রাকচার অনুযায়ী একটি ডামি অ্যারে (পরবর্তীতে API থেকে ডাটা আনবেন)
  const bookings = [
    {
      _id: "69538a345c653d8290635b23",
      userName: "Tanim",
      bookingDate: "2022-09-08",
      planType: "hourly",
      duration: "63",
      region: "Khulna",
      district: "Khulna",
      area: "Sonadanga",
      status: "pending",
      zip: "18591",
      address: "Inventore doloribus asdm",
      totalCost: 882,
      serviceName: "Early Childhood Care",
      createdAt: "2025-12-30T08:15:48.526+00:00",
    },
  ];

  // স্ট্যাটাস অনুযায়ী ব্যাজ ডিজাইন
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <span className="badge badge-warning gap-1 font-bold py-3 px-4 text-xs uppercase tracking-wider"><FaHourglassHalf /> Pending</span>;
      case "confirmed":
        return <span className="badge badge-info gap-1 font-bold py-3 px-4 text-xs uppercase tracking-wider"><FaCheckCircle /> Confirmed</span>;
      case "completed":
        return <span className="badge badge-success gap-1 font-bold py-3 px-4 text-xs uppercase tracking-wider text-white"><FaCheckCircle /> Completed</span>;
      case "cancelled":
        return <span className="badge badge-error gap-1 font-bold py-3 px-4 text-xs uppercase tracking-wider text-white"><FaTimesCircle /> Cancelled</span>;
      default:
        return <span className="badge badge-ghost font-bold py-3 px-4 text-xs uppercase tracking-wider">{status}</span>;
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
          <span className="text-primary font-bold block text-sm uppercase tracking-tighter">Total Active Orders</span>
          <span className="text-2xl font-black text-primary">{bookings.length}</span>
        </div>
      </div>

      {/* Bookings Table / Card View */}
      <div className="overflow-x-auto bg-base-100 rounded-3xl border border-base-200 shadow-sm">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-base-200/50">
            <tr className="text-neutral font-bold text-sm uppercase tracking-wider border-b border-base-200">
              <th className="py-5">Service Details</th>
              <th>Schedule</th>
              <th>Location</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-primary/5 transition-colors group">
                <td className="py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                      {booking.serviceName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-black text-neutral text-base">{booking.serviceName}</div>
                      <div className="text-xs text-neutral/40 font-medium">ID: #{booking._id.slice(-6)}</div>
                    </div>
                  </div>
                </td>
                
                <td>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral/80">
                      <FaCalendarAlt className="text-primary text-xs" /> {booking.bookingDate}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral/50">
                      <FaClock className="text-accent text-xs" /> {booking.duration} Hours ({booking.planType})
                    </div>
                  </div>
                </td>

                <td>
                  <div className="flex items-start gap-2 max-w-[200px]">
                    <FaMapMarkerAlt className="text-error mt-1 text-xs shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-neutral/80">{booking.area}, {booking.district}</p>
                      <p className="text-[11px] text-neutral/50 truncate leading-tight">{booking.address}</p>
                    </div>
                  </div>
                </td>

                <td>
                  <div className="flex items-center gap-1 font-black text-lg text-primary">
                    <span className="text-xs font-bold text-neutral/40">BDT</span>
                    {booking.totalCost}
                  </div>
                </td>

                <td>{getStatusBadge(booking.status)}</td>

                <th className="text-right">
                  <div className="dropdown dropdown-left dropdown-end">
                    <button tabIndex={0} className="btn btn-ghost btn-sm btn-circle group-hover:bg-primary/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d=" incumbents-5 0 0 1 10 0 5 5 0 0 1-10 0zM12 12m-1 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0M12 6m-1 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0M12 18m-1 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0"></path></svg>
                    </button>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-xl w-52 border border-base-200">
                      <li><button className="text-primary font-bold">View Details</button></li>
                      <li><button className="text-error font-bold">Cancel Booking</button></li>
                    </ul>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Empty State (Optional) */}
        {bookings.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTag className="text-3xl text-neutral/20" />
            </div>
            <h3 className="text-xl font-bold text-neutral">No Bookings Found</h3>
            <p className="text-neutral/50">You haven't booked any services yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;