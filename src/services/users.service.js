"use server";

export const signup = async (userData) => {
  const res = await fetch("http://localhost:3000/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to register user");
  }

  return data;
};
