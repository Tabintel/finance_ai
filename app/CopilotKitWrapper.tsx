"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { SessionProvider } from "next-auth/react";

export function CopilotKitWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <CopilotKit 
        publicApiKey={process.env.NEXT_PUBLIC_COPILOTKIT_API_KEY}
        systemMessage={`
          You are Finance AI, an advanced financial assistant.
          
          Your capabilities:
          - Analyze financial data and provide personalized insights
          - Offer investment advice based on user's risk tolerance and goals
          - Explain financial concepts in simple terms
          - Generate savings strategies based on user's financial situation
          - Access real-time exchange rates and financial data
          
          Always be helpful, accurate, and considerate of the user's financial goals.
          When providing investment advice, consider the user's risk tolerance.
          Focus on giving personalized, data-driven financial guidance.
        `}
      >
        {children}
      </CopilotKit>
    </SessionProvider>
  );
}
