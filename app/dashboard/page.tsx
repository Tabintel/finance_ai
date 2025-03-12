"use client";

import { CopilotSidebar } from "@copilotkit/react-ui";
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

const chartData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
];

const pieData = [
  { name: "Stocks", value: 400 },
  { name: "Bonds", value: 300 },
  { name: "Real Estate", value: 300 },
  { name: "Crypto", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DashboardPage() {
    const { data: session } = useSession();
    console.log("session",session)
  return (
    <CopilotSidebar
      defaultOpen={true}
      instructions={
        "Based on the user's financial data and Maybe Finance insights, suggest a savings and investment strategy that fits their risk level."
      }
      labels={{
        title: "Coyamin Assistant",
        initial: "How can I help you today?",
      }}
    >
      <div className="flex  flex-col">
        <div className="w-full min-h-[70px] border-b bg-white flex sticky top-0 left-0">
          <div className=" w-full px-4 gap-4 mx-auto flex items-center justify-between">
            <span className="text-2xl text-bold">Coyamin</span>
            <div className="flex flex-1 items-center justify-end gap-4">
              <div className="w-12 h-12 flex rounded-full text-xl text-white items-center bg-[#000]">
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
                <div className="text-2xl sm:text-4xl font-bold">$45,231.89</div>
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
                <div className="text-2xl sm:text-4xl font-bold">$32,123.45</div>
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
                <div className="text-2xl sm:text-4xl font-bold">$2,400.00</div>
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
                <div className="text-2xl sm:text-4xl font-bold">7.2/10</div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Moderate risk profile
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
