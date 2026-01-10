import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const collection = await dbConnect("services");
    const services = await collection.find().toArray();

    return Response.json({ services });
  } catch (error) {
    console.error("Database Error:", error);
    return Response.json(
      { message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
