"use server";

export const booking = async (bookingData) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/booking`, {
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

export const getBookingById = async (email) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/booking?email=${email}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data;
};

export const bookingDelete = async (id) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/booking?id=${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  const data = await res.json();
  return data;
};

export const updateBookingStatus = async (id, status) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/booking?id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
    cache: "no-store",
  });
  return res.json();
};

export const getAllBookings = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/booking`, {
    cache: "no-store",
  });
  return res.json();
};
