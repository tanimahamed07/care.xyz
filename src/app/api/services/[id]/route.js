import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  const { id } = await params; 
  try {
    const collection = await dbConnect("services");
    const service = await collection.findOne({ _id: new ObjectId(id) });

    if (!service) {
      return Response.json({ message: "Service not found" }, { status: 404 });
    }

    return Response.json({ service });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to fetch service" },
      { status: 500 }
    );
  }
}
