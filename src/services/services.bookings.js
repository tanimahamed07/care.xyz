"use server";

export const booking = async (bookingData) => {
  const res = await fetch('http://localhost:3000/api/booking', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to register user");
  }

  return res.json();
};
