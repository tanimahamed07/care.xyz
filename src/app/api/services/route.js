import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const collection = await dbConnect("services"); // ✅ await এখানে
    const services = await collection.find().toArray();

    return Response.json({ services });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
