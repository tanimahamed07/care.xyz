'use server'
export const getServiceById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/services/${id}?pas=123`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.service; 
};
