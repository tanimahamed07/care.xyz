"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { FaUserCircle, FaIdCard, FaEnvelope, FaPhone, FaMapMarkedAlt, FaEdit, FaCamera } from "react-icons/fa";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-center py-20 text-primary font-bold">Loading Profile...</div>;
  }

  const user = session?.user;

  const userData = {
    name: user?.name || "Guest User",
    email: user?.email || "No Email Found",
    nid: user?.nidNumber || "Not Provided", 
    contact: user?.contact || "Not Provided",  
    address: user?.address || "Address not set yet",
    image: user?.image || "https://i.ibb.co/5GzXkwq/user.png",
    role: user?.role || "user"
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-neutral">
          My <span className="text-primary italic">Profile</span>
        </h1>
        <p className="text-neutral/60 text-sm mt-1">Manage your personal information and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-base-100 rounded-[2.5rem] border border-base-200 p-8 text-center shadow-sm">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <div className="w-full h-full rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 overflow-hidden">
                <Image
                  src={userData.image}
                  alt="profile"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  unoptimized={true} 
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-accent text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                <FaCamera size={14} />
              </button>
            </div>
            <h2 className="text-xl font-black text-neutral">{userData.name}</h2>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">
                {userData.role === "admin" ? "Administrator" : "Verified Member"}
            </p>
            
            <div className="mt-6 pt-6 border-t border-base-100 flex justify-around">
              <div>
                <p className="text-xl font-black text-neutral">12</p>
                <p className="text-[10px] uppercase font-bold text-neutral/40">Bookings</p>
              </div>
              <div className="border-x border-base-100 px-6">
                <p className="text-xl font-black text-neutral">05</p>
                <p className="text-[10px] uppercase font-bold text-neutral/40">Reviews</p>
              </div>
            </div>
          </div>

          <button className="btn btn-primary w-full rounded-2xl gap-2 shadow-lg shadow-primary/20">
            <FaEdit /> Edit Profile
          </button>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="md:col-span-8">
          <div className="bg-base-100 rounded-[2.5rem] border border-base-200 p-8 shadow-sm h-full">
            <h3 className="text-lg font-black text-neutral mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-accent rounded-full"></span>
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-neutral/40 tracking-wider flex items-center gap-2">
                  <FaUserCircle className="text-primary" /> Full Name
                </label>
                <div className="text-neutral font-bold bg-base-200/50 p-3 rounded-xl border border-transparent">
                  {userData.name}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-neutral/40 tracking-wider flex items-center gap-2">
                  <FaEnvelope className="text-primary" /> Email Address
                </label>
                <div className="text-neutral font-bold bg-base-200/50 p-3 rounded-xl border border-transparent overflow-hidden text-ellipsis">
                  {userData.email}
                </div>
              </div>

              {/* NID Field */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-neutral/40 tracking-wider flex items-center gap-2">
                  <FaIdCard className="text-primary" /> NID Number
                </label>
                <div className={`font-bold bg-base-200/50 p-3 rounded-xl border border-transparent tracking-widest ${userData.nid === "Not Provided" ? "text-error/60 italic" : "text-neutral"}`}>
                  {userData.nid}
                </div>
              </div>

              {/* Contact Field */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-neutral/40 tracking-wider flex items-center gap-2">
                  <FaPhone className="text-primary" /> Contact Number
                </label>
                <div className={`font-bold bg-base-200/50 p-3 rounded-xl border border-transparent ${userData.contact === "Not Provided" ? "text-error/60 italic" : "text-neutral"}`}>
                  {userData.contact}
                </div>
              </div>

              {/* Address Field */}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] uppercase font-black text-neutral/40 tracking-wider flex items-center gap-2">
                  <FaMapMarkedAlt className="text-primary" /> Permanent Address
                </label>
                <div className="text-neutral font-bold bg-base-200/50 p-4 rounded-xl border border-transparent">
                  {userData.address}
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className={`mt-8 p-6 rounded-3xl border flex items-center justify-between ${userData.nid !== "Not Provided" ? "bg-success/5 border-success/20" : "bg-warning/5 border-warning/20"}`}>
               <div>
                  <h4 className={`text-sm font-black ${userData.nid !== "Not Provided" ? "text-success" : "text-warning"}`}>
                    {userData.nid !== "Not Provided" ? "Identity Verified" : "Verification Pending"}
                  </h4>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${userData.nid !== "Not Provided" ? "text-success/70" : "text-warning/70"}`}>
                    Trust Score: {userData.nid !== "Not Provided" ? "100%" : "40%"}
                  </p>
               </div>
               <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg ${userData.nid !== "Not Provided" ? "bg-success shadow-success/30" : "bg-warning shadow-warning/30"}`}>
                  <FaIdCard />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;