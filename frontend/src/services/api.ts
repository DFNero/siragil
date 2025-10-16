import axios from "axios";

export const API_URL = "http://localhost:5000/api/auth"; // sesuai backend

// ===== Login =====
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data; // { message, token, role }
};

// ===== Register =====
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const res = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    role,
  });
  return res.data;
};
