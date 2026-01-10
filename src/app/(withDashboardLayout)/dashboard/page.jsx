"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminOverview from "@/components/dashboard/AdminOverview";
import UserOverview from "@/components/dashboard/UserOverview";

const Dashboard = () => {
  const { data: session, status } = useSession(); 
  const [adminData, setAdminData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {

    if (status === "authenticated") {
      const endpoint = isAdmin
        ? "/api/dashboard/admin-overview"
        : "/api/dashboard/user-overview";

      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            isAdmin ? setAdminData(data.data) : setUserData(data.data);
          }
        })
        .catch((err) => console.error("Fetch Error:", err))
        .finally(() => setLoading(false));
    }
  }, [isAdmin, status]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session) {
    return <div className="p-10 text-center text-error">Access Denied. Please Login.</div>;
  }

  return (
    <div className="p-4 md:p-8">
      {isAdmin ? (
        <AdminOverview data={adminData} loading={loading} />
      ) : (
        <UserOverview data={userData} loading={loading} session={session} />
      )}
    </div>
  );
};

export default Dashboard;