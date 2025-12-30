import { dbConnect } from "@/lib/dbConnect";

export async function POST(request) {
  try {
    const body = await request.json();
    const collection = await dbConnect("bookings");

    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });
    return Response.json(result);
  } catch (error) {
    return Response.json({
      acknowledged: false,
      error: "Failed to create booking",
      status: 500,
    });
  }
}
