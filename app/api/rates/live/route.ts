import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const to = searchParams.get("to");

    if (!to) {
      return NextResponse.json(
        { message: "Missing required query parameter: to" },
        { status: 400 }
      );
    }

    const response = await axios.get(`${BASE_URL}/rates/live`, {
      params: { to },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if(error instanceof Error) {
      return NextResponse.json(
        { message: "Error fetching live rates", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Error fetching live rates"},
      { status: 500 }
    );
  }
}
