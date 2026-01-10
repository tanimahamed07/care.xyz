"use server";

export const signup = async (userData) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
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
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return res.json("Failed to fetch users");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return res.json(error);
  }
};

// export const updateUserRole = async (id, newRole) => {
//   try {
//     const res = await fetch(`process.env.NEXTAUTH_URL/api/user?id=${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ role: newRole }),
//       cache: "no-store",
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || "Failed to update role");
//     }

//     return data; // { modifiedCount }
//   } catch (error) {
//     console.error("Update error:", error.message);
//     return { modifiedCount: 0 };
//   }
// };

export const updateUserRole = async (id, role) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user?id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }),
    cache: "no-store",
  });

  if (!res.ok) {
    return "Failed to update role";
  }

  return res.json();
};
