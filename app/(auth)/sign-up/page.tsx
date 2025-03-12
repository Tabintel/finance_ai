"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterFormData } from "@/constants";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function AuthPage() {
  const [formValue, setFormValue] = useState({
    name: "",
    password: "",
    email: "",
  });
  const router = useRouter();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValue),
    });

    const data = await res.json();
    // console.log("data", data);
    localStorage.setItem("token", data.token);
    if (res.ok) {
      //  Automatically log in the user
      const res = await signIn("credentials", {
        email:formValue.email,
        password:formValue.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/onboarding"); // Redirect to onboarding
      } else {
        console.error("Sign-in failed", res?.error ?? "Unknown error")
      }
    } else {
      toast.error("Registration failed");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            AI Investment Copilot
          </CardTitle>
          <CardDescription className="text-center">
            Make informed financial decisions with AI-powered insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {RegisterFormData?.map((formdata, index) => {
              return (
                <div key={index} className="space-y-2">
                  <Label htmlFor={formdata?.label}>{formdata?.text}</Label>
                  <Input
                    onChange={onChange}
                    id={formdata?.label}
                    name={formdata?.name}
                    value={formValue[formdata?.name]}
                    placeholder={formdata?.label}
                    type={formdata?.type}
                    required
                  />
                </div>
              );
            })}
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700"
              type="submit"
            >
              {loading ? " Creating Account..." : " Create Account"}
            </Button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" className="bg-white">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
