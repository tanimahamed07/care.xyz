"use server";
export const getServiceById = async (id) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/services/${id}?pas=123`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data.service;
};
