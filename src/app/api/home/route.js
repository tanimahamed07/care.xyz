import { dbConnect } from "@/lib/dbConnect";

const collection = await dbConnect("services");
export async function GET() {
  try {
    const collection = await dbConnect("services");
    const services = await collection.find({ populer: true }).toArray(); 

    return Response.json({ success: true, services });
  } catch (error) {
    console.error("Error fetching popular services:", error);
    return Response.json(
      { success: false, message: "Failed to fetch popular services" },
      { status: 500 }
    );
  }
}
