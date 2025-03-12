import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL; // Ensure correct API URL

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const description = searchParams.get("description");
    const amount = searchParams.get("amount");
    const city = searchParams.get("city");
    const state = searchParams.get("state");
    const country = searchParams.get("country");

    if (!description || !amount || !city || !state || !country) {
      return NextResponse.json(
        {
          message:
            "Missing required query parameters: description, city, state, country, and amount",
        },
        { status: 400 }
      );
    }

    const { data } = await axios.get(`${BASE_URL}/enrich`, {
      params: { description, amount, city, state, country },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error fetching financial insight", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "an unkwon error ocurred" },
      { status: 500 }
    );
  }
};
