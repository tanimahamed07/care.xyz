export const getPoulerServices = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/home`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.services;
};
