import { Metadata } from "next";
import "./globals.css";
import "@copilotkit/react-ui/styles.css";
import { CopilotKitWrapper } from './CopilotKitWrapper';

export const metadata: Metadata = {
  title: "Finance AI",
  description: "An AI-powered financial assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* The suppressHydrationWarning is needed to avoid errors with browser extensions like Grammarly */}
      <body suppressHydrationWarning={true}>
        <CopilotKitWrapper>
          {children}
        </CopilotKitWrapper>
      </body>
    </html>
  );
}
