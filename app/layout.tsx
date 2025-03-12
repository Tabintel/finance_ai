import { Metadata } from "next";
import "./globals.css";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import ProviderLayout from "@/providers/StoreProvider";

export const metadata: Metadata = {
  title: "Coramin Ai-Saving",
  description: "An application for generating Ai-Saving",
};

// Load API Key from .env file
const copilotApiKey = process.env.NEXT_PUBLIC_COPILOTKIT_API_KEY;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ProviderLayout>
          {copilotApiKey ? (
            <CopilotKit publicApiKey={copilotApiKey}>{children}</CopilotKit>
          ) : (
            <>{children}</>
          )}
        </ProviderLayout>
      </body>
    </html>
  );
}
