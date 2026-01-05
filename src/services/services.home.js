export const getPoulerServices = async () => {
  const res = await fetch("http://localhost:3000/api/home", {
    cache: "no-store",
  });

  const data = await res.json();
  return data.services;
};