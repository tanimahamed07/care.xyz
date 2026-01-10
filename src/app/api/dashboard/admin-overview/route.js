import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const bookingCollection = await dbConnect("bookings"); 
    const allBookings = await bookingCollection.find().toArray();

    const totalBookings = allBookings.length;

    const totalRevenue = allBookings.reduce((sum, booking) => sum + (Number(booking.totalCost) || 0), 0);

    const pendingBookings = allBookings.filter(b => b.status === "pending").length;
    const confirmedBookings = allBookings.filter(b => b.status === "confirmed").length;
    const completedBookings = allBookings.filter(b => b.status === "completed").length;

    const recentBookings = allBookings.slice(-5).reverse();

    return Response.json({
      success: true,
      data: {
        stats: {
          totalBookings,
          totalRevenue,
          pendingBookings,
          confirmedBookings,
          completedBookings
        },
        recentBookings
      }
    });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}