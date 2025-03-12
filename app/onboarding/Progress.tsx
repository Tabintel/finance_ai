import { ArrowRight } from "lucide-react";
import React from "react";

export default function Progress({
  steps,
  currentStep,
}: {
  steps: { title: string; progress: number }[];
  currentStep: number;
}) {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </div>
            <span className="ml-2 text-sm hidden sm:inline">{step.title}</span>
            {index < steps.length - 1 && (
              <ArrowRight className="mx-2 text-gray-400" size={20} />
            )}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${steps[currentStep].progress}%` }}
        />
      </div>
    </div>
  );
}
