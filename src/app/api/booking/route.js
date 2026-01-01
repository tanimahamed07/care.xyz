import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
const collection = await dbConnect("bookings");

export async function POST(request) {
  try {
    const body = await request.json();

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

export async function GET(request, { query }) {
  const { searchParams } = new URL(request.url);

  const email = searchParams.get("email");

  console.log(email);
  try {
    const result = await collection.find({ email: email }).toArray();

    return Response.json(result);
  } catch (error) {
    return Response.json({ error });
  }
}
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const collection = await dbConnect("bookings");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return Response.json(result);
  } catch (error) {
    return Response.json(error);
  }
}
