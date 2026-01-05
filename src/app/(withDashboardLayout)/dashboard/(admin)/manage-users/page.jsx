"use client";

import { getAllUsers, updateUserRole } from "@/services/users.service";
import React, { useEffect, useState } from "react";
import {
  FaUserShield,
  FaUserFriends,
  FaIdCard,
  FaEnvelope,
  FaPhoneAlt,
  FaSyncAlt,
} from "react-icons/fa";

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChangeRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    try {
      const data = await updateUserRole(id, newRole);

      if (data.modifiedCount > 0) {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
        );
      } else {
        alert("Role already same");
      }
    } catch (err) {
      alert("Role update failed");
    }
  };

  if (loading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="font-bold text-neutral/50 animate-pulse">
            Fetching users from database...
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-neutral">
            Manage <span className="text-primary italic">Platform Users</span>
          </h1>
          <p className="text-neutral/60 text-sm mt-1 tracking-wide">
            Overview of all registered users & administrators
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-primary/10 border border-primary/20 px-6 py-3 rounded-2xl text-center">
            <span className="text-primary font-bold block text-xs uppercase tracking-wider">
              Total Users
            </span>
            <span className="text-2xl font-black text-primary">
              {users.length}
            </span>
          </div>

          <div className="bg-accent/10 border border-accent/20 px-6 py-3 rounded-2xl text-center">
            <span className="text-accent font-bold block text-xs uppercase tracking-wider">
              Admins
            </span>
            <span className="text-2xl font-black text-accent">
              {users.filter((u) => u.role === "admin").length}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-3xl border border-base-200 shadow-sm">
        <table className="table table-zebra w-full hidden md:table">
          <thead className="bg-base-200/50">
            <tr className="text-neutral font-bold text-sm uppercase tracking-wider border-b">
              <th className="py-5">User Info</th>
              <th>Verification</th>
              <th>Contact</th>
              <th className="text-center">Role</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-20 text-neutral/40">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-primary/5 transition-colors group"
                >
                  {/* User Info */}
                  <td className="py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary">
                        {user.fullName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-black text-neutral">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-neutral/40 font-bold">
                          UID: #{user._id?.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Verification */}
                  <td>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-base-200/60 text-xs font-bold text-neutral/70">
                      <FaIdCard className="text-primary text-xs" />
                      {user.nidNumber || "N/A"}
                    </div>
                  </td>

                  {/* Contact */}
                  <td>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-neutral/80 flex items-center gap-1">
                        <FaEnvelope className="text-primary/60" />
                        {user.email}
                      </p>
                      <p className="text-[11px] text-neutral/50 flex items-center gap-1">
                        <FaPhoneAlt />
                        {user.contact}
                      </p>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="text-center">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-black uppercase text-white
                    ${
                      user.role === "admin"
                        ? "bg-accent"
                        : "bg-base-300 text-neutral/60"
                    }`}
                    >
                      {user.role === "admin" ? (
                        <FaUserShield className="inline mr-1" />
                      ) : (
                        <FaUserFriends className="inline mr-1" />
                      )}
                      {user.role}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="text-right">
                    <button
                      onClick={() => handleChangeRole(user._id, user.role)}
                      className="text-primary font-bold hover:underline"
                    >
                      Change Role
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserFriends className="text-3xl text-neutral/20" />
            </div>
            <h3 className="text-xl font-bold text-neutral">No Users Found</h3>
            <p className="text-neutral/50">
              There are no registered users yet.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="text-xs font-bold text-neutral/40 px-2">
        Showing {users.length} registered accounts
      </p>
    </div>
  );
};

export default ManageUsersPage;
