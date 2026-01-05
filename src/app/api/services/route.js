import { dbConnect } from "@/lib/dbConnect";

const collection = await dbConnect("services");
export async function GET() {
  try {
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


