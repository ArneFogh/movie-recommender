// src/app/api/recommend-multi/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    const response = await fetch("http://127.0.0.1:5000/api/recommend-multi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Flask API error:", response.status);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: response.status }
      );
    }

    const recommendations = await response.json();
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("API Route error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
