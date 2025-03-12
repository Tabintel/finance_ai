import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Chat({
  messages,
  handleOptionSelect,
}: {
  messages: {
    type: string;
    content: string;
    options?: string[];
  }[];
  handleOptionSelect: (val: string) => void;
}) {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-0">
        <div className="h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start max-w-[80%] ${
                    message.type === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === "user"
                        ? "bg-blue-600 ml-2"
                        : "bg-gray-200 mr-2"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg flex-1 p-4 ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Options */}
          {messages[messages.length - 1]?.options && (
            <div className="p-4 border-t bg-gray-50">
              <div className="flex flex-wrap gap-2">
                {messages[messages.length - 1]?.options?.map((option) => (
                  <Button
                    key={option}
                    variant="outline"
                    className="bg-white hover:bg-blue-50"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
