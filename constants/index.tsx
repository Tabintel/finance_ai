import {
  RegisterFormDataItem,
  LoginFormDataItem,
} from "./types";


export const LoginFormData: LoginFormDataItem[] = [
  {
    id: 1,
    name: "email",
    type: "email",
    text: "Email",
    label: "hello@example.com",
    required: true,
  },
  {
    id: 4,
    name: "password",
    type: "password",
    text: "Password",
    label: "my password",
    required: true,
  },
];
export const RegisterFormData: RegisterFormDataItem[] = [
  {
    id: 12,
    name: "name",
    type: "text",
    text: "Name",
    label: "Jane Doe",
    required: true,
  },
  {
    id: 1,
    name: "email",
    type: "email",
    text: "Email",
    label: "hello@example.com",
    required: true,
  },
  {
    id: 4,
    name: "password",
    type: "password",
    text: "Password",
    label: "my password",
    required: true,
  },
];


export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
export const AUTH_URL = "/api/auth";