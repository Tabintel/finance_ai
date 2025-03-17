"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import Progress from "./Progress";
import Chat from "./Chat";
import { useSession, updateSession } from "next-auth/react";

interface Message {
  type: "bot" | "user";
  content: string;
  options?: string[];
}

export default function OnboardingChat() {
  const router = useRouter();
  const { data: session, update } = useSession();

  // Redirect if already onboarded
  useEffect(() => {
    if (session?.user?.isOnboarded) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content:
        "Welcome to Finance AI! I'm your AI Investment & Savings Assistant. Let's set up your financial profile. What are your main financial goals?",
      options: [
        "Short-term savings (1-2 years)",
        "Long-term investments (5+ years)",
        "Retirement planning",
        "Emergency fund",
        "Wealth building",
      ],
    },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string[]>
  >({});

  const steps = [
    { title: "Financial Goals", progress: 33 },
    { title: "Risk Tolerance", progress: 66 },
    { title: "Investment Preferences", progress: 100 },
  ];

  const handleOptionSelect = async (option: string) => {
    setMessages((prev) => [...prev, { type: "user", content: option }]);

    setSelectedOptions((prev) => ({
      ...prev,
      [currentStep]: [...(prev[currentStep] || []), option],
    }));

    setTimeout(async () => {
      if (currentStep === 0) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: "Great choice! Now, what's your risk tolerance level?",
            options: [
              "Conservative (Low Risk)",
              "Moderate (Medium Risk)",
              "Aggressive (High Risk)",
            ],
          },
        ]);
        setCurrentStep(1);
      } else if (currentStep === 1) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "Perfect! Finally, which investment types interest you? (You can select multiple)",
            options: [
              "Stocks",
              "ETFs",
              "Bonds",
              "Crypto",
              "Real Estate",
              "Mutual Funds",
            ],
          },
        ]);
        setCurrentStep(2);
      } else if (currentStep === 2) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "Thanks! I'll now create your personalized investment profile based on your preferences.",
          },
        ]);

        // Store user preferences in localStorage
        const userPreferences = {
          financialGoals: selectedOptions[0] || [],
          riskTolerance: selectedOptions[1] || [],
          investmentPreferences: selectedOptions[2] || [],
        };

        localStorage.setItem("userPreferences", JSON.stringify(userPreferences));

        // Call API to mark onboarding as complete
        const response = await fetch("/api/auth/onboarding", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        // Immediately after completing onboarding
        if (response.ok) {
          // Update the session client-side
          await update({ user: { ...session?.user, isOnboarded: true } });
          
          // Set a local flag that can be checked by middleware
          localStorage.setItem("isOnboarded", "true");
          
          router.replace("/dashboard");
          
          // Reload the page after a short delay to ensure fresh token
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } else {
          console.error("Onboarding failed:", data.error);
        }
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between shadow-md">
        <h1 className="text-lg font-semibold">Finance AI Onboarding</h1>
        <Sparkles size={24} />
      </header>

      <div className="max-w-3xl mx-auto p-4">
        {/* Progress Indicator */}
        <Progress currentStep={currentStep} steps={steps} />
        <Chat messages={messages} handleOptionSelect={handleOptionSelect} />

        {/* Selected Preferences */}
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.values(selectedOptions)
            .flat()
            .map((option, index) => (
              <Badge key={index} variant="secondary">
                {option}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
}