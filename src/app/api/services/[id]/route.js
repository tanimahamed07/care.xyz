import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {

  const { searchParams } = new URL(request.url);

  const pas = searchParams.get("pas");
  console.log("===>", pas);
  const { id } = await params;
  if (id.length != 24) {
    return { success: false };
  }
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
