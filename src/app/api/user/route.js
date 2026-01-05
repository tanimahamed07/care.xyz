import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const users = await dbConnect("users");
export async function POST(request) {
  const reqBody = await request.json();
  const isUserExist = await users.findOne({ email: reqBody.email });
  if (isUserExist) {
    return Response.json({ message: "User already exists", status: 409 });
  }

  const passwordHash = await bcrypt.hash(reqBody.password, 10);

  const newUser = await users.insertOne({ ...reqBody, password: passwordHash });

  return Response.json({
    status: 201,
    message: "User registered successfully",
    data: newUser,
  });
}

export async function GET(request) {
  try {
    const allUsers = await users.find().toArray();
    return Response.json(allUsers);
  } catch (error) {
    return Response.json(error);
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();

    if (!id || !body.role) {
      return Response.json({ message: "Invalid request" }, { status: 400 });
    }

    const result = await users.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role: body.role } }
    );

    return Response.json({
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
