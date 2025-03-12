"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import ToasterProvider from "./ToasterProvider";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ToasterProvider />
      {children}
    </SessionProvider>
  );
}
