
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const db = await connectToDatabase();
    const data = await request.json();

    const surveyData = {
      ...data,
      createdAt: new Date(),
    };

    await db.collection("survei_skm").insertOne(surveyData);

    return NextResponse.json({ message: "Survei submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Failed to submit survei" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    const surveys = await db.collection("survei_skm").find({}).sort({ createdAt: -1 }).toArray();

    // Transformasi data: Mengubah kunci 'u' menjadi 'p' saat data dibaca
    const transformedSurveys = surveys.map(survey => {
      const newSurvey: { [key: string]: any } = {};
      for (const key in survey) {
        if (key.startsWith('u') && !isNaN(parseInt(key.substring(1)))) {
          const newKey = 'p' + key.substring(1);
          newSurvey[newKey] = survey[key];
        } else {
          newSurvey[key] = survey[key];
        }
      }
      return newSurvey;
    });

    return NextResponse.json(transformedSurveys, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Failed to fetch surveys" }, { status: 500 });
  }
}
