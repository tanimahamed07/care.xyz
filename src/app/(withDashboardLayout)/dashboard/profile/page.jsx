"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FaUserCircle,
  FaIdCard,
  FaEnvelope,
  FaPhone,
  FaMapMarkedAlt,
  FaEdit,
  FaCamera,
} from "react-icons/fa";
import Image from "next/image";

const ProfilePage = () => {
  const { status } = useSession();

  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch user from DB
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/dashboard/profile");
        const data = await res.json();
        console.log(res)

        if (data.success) {
          setDbUser(data.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (status === "authenticated") {
      fetchUserData();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);
  
  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-primary font-bold">
        Loading Profile...
      </div>
    );
  }
  
  console.log('dbUser:', dbUser);
  // 🔹 UI data comes ONLY from DB
  const userData = {
    name: dbUser?.fullName || "Guest User",
    email: dbUser?.email || "No Email Found",
    nid: dbUser?.nidNumber || "Not Provided",
    contact: dbUser?.contact || "Not Provided",
    address: dbUser?.address || "Address not set yet",
    image: dbUser?.image || "https://i.ibb.co/5GzXkwq/user.png",
    role: dbUser?.role || "user",
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-neutral">
          My <span className="text-primary italic">Profile</span>
        </h1>
        <p className="text-neutral/60 text-sm mt-1">
          Manage your personal information and security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column */}
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
                  unoptimized
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-accent text-white p-2 rounded-full shadow-lg">
                <FaCamera size={14} />
              </button>
            </div>

            <h2 className="text-xl font-black text-neutral">
              {userData.name}
            </h2>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">
              {userData.role === "admin" ? "Administrator" : "Verified Member"}
            </p>
          </div>

          <button className="btn btn-primary w-full rounded-2xl gap-2">
            <FaEdit /> Edit Profile
          </button>
        </div>

        {/* Right Column */}
        <div className="md:col-span-8">
          <div className="bg-base-100 rounded-[2.5rem] border border-base-200 p-8 shadow-sm">
            <h3 className="text-lg font-black text-neutral mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-accent rounded-full"></span>
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <Info label="Full Name" icon={<FaUserCircle />} value={userData.name} />

              {/* Email */}
              <Info label="Email Address" icon={<FaEnvelope />} value={userData.email} />

              {/* NID */}
              <Info
                label="NID Number"
                icon={<FaIdCard />}
                value={userData.nid}
                warning={userData.nid === "Not Provided"}
              />

              {/* Contact */}
              <Info
                label="Contact Number"
                icon={<FaPhone />}
                value={userData.contact}
                warning={userData.contact === "Not Provided"}
              />

              {/* Address */}
              <div className="sm:col-span-2">
                <Info
                  label="Permanent Address"
                  icon={<FaMapMarkedAlt />}
                  value={userData.address}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 🔹 Reusable Info Component */
const Info = ({ label, icon, value, warning }) => (
  <div className="space-y-1">
    <label className="text-[10px] uppercase font-black text-neutral/40 tracking-wider flex items-center gap-2">
      <span className="text-primary">{icon}</span> {label}
    </label>
    <div
      className={`font-bold bg-base-200/50 p-3 rounded-xl ${
        warning ? "text-error/60 italic" : "text-neutral"
      }`}
    >
      {value}
    </div>
  </div>
);

export default ProfilePage;
