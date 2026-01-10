
import { dbConnect } from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const bookingCollection = await dbConnect("bookings");
    
    const userBookings = await bookingCollection.find({ email: email }).toArray();

    const totalBookings = userBookings.length;
    const totalSpent = userBookings.reduce((sum, b) => sum + (Number(b.totalCost) || 0), 0);
    const pendingCare = userBookings.filter(b => b.status === "pending").length;
    const activeServices = userBookings.filter(b => b.status === "confirmed").length;

    const recentBookings = userBookings.slice(-5).reverse();

    return Response.json({
      success: true,
      data: {
        stats: {
          totalBookings,
          totalSpent,
          pendingCare,
          activeServices
        },
        recentBookings
      }
    });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}