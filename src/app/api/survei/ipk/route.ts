
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const db = await connectToDatabase();
    const data = await request.json();

    // Add a timestamp to the data
    const surveyData = {
      ...data,
      createdAt: new Date(),
    };

    await db.collection("survei_ipk").insertOne(surveyData);

    return NextResponse.json({ message: "Survei submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Failed to submit survei" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    const surveys = await db.collection("survei_ipk").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(surveys, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Failed to fetch surveys" }, { status: 500 });
  }
}
