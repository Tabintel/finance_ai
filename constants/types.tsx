export type ProfileFormDataItem = {
  id: number;
  name: keyof FormValueType; // It ensures the name corresponds to keys in FormValueType
  text: string;
  label: string;
  type: string;
  required: boolean;
};
export type FormValueType = {
  name: string;
  username: string;
  email: string;
  linkedln: string;
  country: string;
  password: string;
  salary?: string;
};

// -------- Login form Data Type Start ----------------------
export type LoginValueType = {
  email: string;
  password: string;
};
export type LoginFormDataItem = {
  id: number;
  name: keyof LoginValueType; // It ensures the name corresponds to keys in FormValueType
  text: string;
  label: string;
  type: string;
  required: boolean;
};
// -------- Login form Data Type End ----------------------

// -------- Register form Data Type Start ----------------------
export type RegisterValueType = {
  email: string;
  password: string;
  name: string;
};
export type RegisterFormDataItem = {
  id: number;
  name: keyof RegisterValueType; // It ensures the name corresponds to keys in FormValueType
  text: string;
  label: string;
  type: string;
  required: boolean;
};
// -------- Login form Data Type End ----------------------

export type ApplicationFormDataItem = {
  id: number;
  name: keyof FormValueType; // It ensures the name corresponds to keys in FormValueType
  text: string;
  label: string;
  type: string;
  required: boolean;
};

export type PasswordFormValueType = {
  password: string;
  confirmpassword: string;
};

export type ProfilePasswordDataItem = {
  id: number;
  name: keyof PasswordFormValueType; // It ensures the name corresponds to keys in FormValueType
  text: string;
  label: string;
  type: string;
  required: boolean;
};

export type productDataType = {
  title: string;
  price: number;
  id: string;
  image: string;
  category: string;
  size: string;
  color: string;
  availabilityCount?:number;
};
