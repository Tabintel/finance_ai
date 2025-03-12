import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {name, email, password: hashedPassword, isOnboarded:false },
    });

    // Just return success; let frontend handle sign-in
    return NextResponse.json({ message: "User registered!", user: newUser });
  } catch (error) {
    return NextResponse.json({ message: "Error during registration", error }, { status: 500 });
  }
}
