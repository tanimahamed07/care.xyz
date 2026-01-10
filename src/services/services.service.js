export const getAllServices = async () => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/services`,
    {
      next: {
        revalidate: 0,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data.services;
};
