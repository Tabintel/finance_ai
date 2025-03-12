import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update onboarding status in the database
    const updatedUser = await prisma.user.update({
      where: { id: token.sub },
      data: { isOnboarded: true },
    });

    // Return success response
    return NextResponse.json({
      message: "Onboarding complete",
      user: { ...token, isOnboarded: true },
    });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}