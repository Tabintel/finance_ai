"use client";

import { CopilotSidebar } from "@copilotkit/react-ui";
import { useCopilotAction } from "@copilotkit/react-core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session } = useSession();
  
  // State for modifiable financial data
  const [totalBalance, setTotalBalance] = useState(45231.89);
  const [investments, setInvestments] = useState(32123.45);
  const [monthlySavings, setMonthlySavings] = useState(2400.00);
  const [riskScore, setRiskScore] = useState(7.2);
  
  // Format functions to display numbers with commas
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  const formatRisk = (value) => {
    return value.toFixed(1);
  };
  
  // State for chart data
  const [chartData, setChartData] = useState([
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
  ]);
  
  // State for pie data
  const [pieData, setPieData] = useState([
    { name: "Stocks", value: 400 },
    { name: "Bonds", value: 300 },
    { name: "Real Estate", value: 300 },
    { name: "Crypto", value: 200 },
  ]);
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

 // Action to update total balance
useCopilotAction({
  name: "updateTotalBalance",
  description: "Update the user's total financial balance",
  parameters: [
    { name: "amount", type: "number", description: "New balance amount" }
  ],
  handler: async (amount) => {
    console.log("updateTotalBalance called with:", amount, "type:", typeof amount);
    
    // Handle if amount is an object with amount property
    let numericAmount;
    if (typeof amount === 'object' && amount !== null && 'amount' in amount) {
      numericAmount = Number(amount.amount);
      console.log("Extracted amount from object:", numericAmount);
    } else {
      numericAmount = Number(amount);
    }
    
    if (isNaN(numericAmount)) {
      console.error("Invalid amount format:", amount);
      return { success: false, error: "Invalid amount format" };
    }
    
    setTotalBalance(numericAmount);
    return { 
      success: true, 
      message: `Total balance updated to $${formatCurrency(numericAmount)}` 
    };
  }
});

// Action to update investments
useCopilotAction({
  name: "updateInvestments",
  description: "Update the user's investment amount",
  parameters: [
    { name: "amount", type: "number", description: "New investment amount" }
  ],
  handler: async (amount) => {
    console.log("updateInvestments called with:", amount, "type:", typeof amount);
    
    // Handle if amount is an object with amount property
    let numericAmount;
    if (typeof amount === 'object' && amount !== null && 'amount' in amount) {
      numericAmount = Number(amount.amount);
      console.log("Extracted amount from object:", numericAmount);
    } else {
      numericAmount = Number(amount);
    }
    
    if (isNaN(numericAmount)) {
      console.error("Invalid amount format:", amount);
      return { success: false, error: "Invalid amount format" };
    }
    
    setInvestments(numericAmount);
    return { 
      success: true, 
      message: `Investments updated to $${formatCurrency(numericAmount)}` 
    };
  }
});

// Action to update monthly savings
useCopilotAction({
  name: "updateMonthlySavings",
  description: "Update the user's monthly savings amount",
  parameters: [
    { name: "amount", type: "number", description: "New monthly savings amount" }
  ],
  handler: async (amount) => {
    console.log("updateMonthlySavings called with:", amount, "type:", typeof amount);
    
    // Handle if amount is an object with amount property
    let numericAmount;
    if (typeof amount === 'object' && amount !== null && 'amount' in amount) {
      numericAmount = Number(amount.amount);
      console.log("Extracted amount from object:", numericAmount);
    } else {
      numericAmount = Number(amount);
    }
    
    if (isNaN(numericAmount)) {
      console.error("Invalid amount format:", amount);
      return { success: false, error: "Invalid amount format" };
    }
    
    setMonthlySavings(numericAmount);
    return { 
      success: true, 
      message: `Monthly savings updated to $${formatCurrency(numericAmount)}` 
    };
  }
});

// Action to update risk score
useCopilotAction({
  name: "updateRiskScore",
  description: "Update the user's risk tolerance score (1-10 scale)",
  parameters: [
    { name: "score", type: "number", description: "New risk score (1-10)" }
  ],
  handler: async (score) => {
    console.log("updateRiskScore called with:", score, "type:", typeof score);
    
    // Handle if score is an object with score property
    let numericScore;
    if (typeof score === 'object' && score !== null && 'score' in score) {
      numericScore = Number(score.score);
      console.log("Extracted score from object:", numericScore);
    } else {
      numericScore = Number(score);
    }
    
    if (isNaN(numericScore) || numericScore < 1 || numericScore > 10) {
      console.error("Invalid risk score:", score);
      return { success: false, error: "Risk score must be between 1 and 10" };
    }
    
    setRiskScore(numericScore);
    
    let riskProfile = "Low";
    if (numericScore > 3 && numericScore <= 7) {
      riskProfile = "Moderate";
    } else if (numericScore > 7) {
      riskProfile = "High";
    }
    
    return { 
      success: true, 
      message: `Risk score updated to ${formatRisk(numericScore)}/10 (${riskProfile} risk profile)` 
    };
  }
});

  
// Rich context for the AI
const contextString = `
  USER CONTEXT:
  - User: ${session?.user?.name || "User"}
  
  PORTFOLIO DATA:
  - Total Balance: $${typeof totalBalance === 'object' ? 
      formatCurrency(totalBalance.amount || 0) : 
      formatCurrency(totalBalance)}
  - Investments: $${typeof investments === 'object' ? 
      formatCurrency(investments.amount || 0) : 
      formatCurrency(investments)}
  - Monthly Savings: $${typeof monthlySavings === 'object' ? 
      formatCurrency(monthlySavings.amount || 0) : 
      formatCurrency(monthlySavings)}
  - Risk Score: ${typeof riskScore === 'object' ? 
      formatRisk(riskScore.score || 0) : 
      formatRisk(riskScore)}/10
  
  ASSET ALLOCATION:
  - Stocks: ${Math.round(pieData[0].value / pieData.reduce((a, b) => a + b.value, 0) * 100)}%
  - Bonds: ${Math.round(pieData[1].value / pieData.reduce((a, b) => a + b.value, 0) * 100)}%
  - Real Estate: ${Math.round(pieData[2].value / pieData.reduce((a, b) => a + b.value, 0) * 100)}%
  - Crypto: ${Math.round(pieData[3].value / pieData.reduce((a, b) => a + b.value, 0) * 100)}%
  
  AVAILABLE ACTIONS:
  - updateTotalBalance(amount: number) - Update the total balance
  - updateInvestments(amount: number) - Update investments
  - updateMonthlySavings(amount: number) - Update monthly savings
  - updateRiskScore(score: number) - Update risk score (1-10)
  
  Example: To update investments to $50,000, use updateInvestments(50000)
`;



useEffect(() => {
  console.log("State values:", {
    totalBalance: typeof totalBalance, 
    investments: typeof investments,
    monthlySavings: typeof monthlySavings,
    riskScore: typeof riskScore
  });
  
  // Check for object values that might cause rendering issues
  if (typeof totalBalance === 'object') console.error("totalBalance is an object:", totalBalance);
  if (typeof investments === 'object') console.error("investments is an object:", investments);
  if (typeof monthlySavings === 'object') console.error("monthlySavings is an object:", monthlySavings);
  if (typeof riskScore === 'object') console.error("riskScore is an object:", riskScore);
}, [totalBalance, investments, monthlySavings, riskScore]);


  return (
    <CopilotSidebar
      defaultOpen={true}
      instructions={contextString}
      labels={{
        title: "Finance AI Assistant",
        initial: "How can I help you today? You can ask about your portfolio, get investment advice, or make changes to your financial data.",
      }}
    >
      <div className="flex flex-col">
        <div className="w-full min-h-[70px] border-b bg-white flex sticky top-0 left-0">
          <div className="w-full px-4 gap-4 mx-auto flex items-center justify-between">
            <span className="text-2xl text-bold">Finance AI</span>
            <div className="flex flex-1 items-center justify-end gap-4">
              <div className="w-12 h-12 flex rounded-full text-xl text-white items-center justify-center bg-[#000]">
                {session?.user?.name?.slice(0,1)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {/* Overview Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Total Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-4xl font-bold">${totalBalance}</div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-4xl font-bold">${investments}</div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  78 active positions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Monthly Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-4xl font-bold">${monthlySavings}</div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">Risk Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-4xl font-bold">{riskScore}/10</div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {parseFloat(riskScore) <= 3 ? "Low" : parseFloat(riskScore) <= 7 ? "Moderate" : "High"} risk profile
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card className="col-span-1 md:col-span-2 lg:col-span-4">
              <CardHeader>
                <CardTitle>Portfolio Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CopilotSidebar>
  );
}
