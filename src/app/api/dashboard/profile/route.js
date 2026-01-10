import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session?.user?.email) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userCollection = await dbConnect("users");

    const user = await userCollection.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
