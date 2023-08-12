// api-service.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const headers = {
  'Content-Type': 'application/json',
};

async function loginUser(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error in logging in user:", error.response.data);
    
    throw error;
  }
}

async function registerUser(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error in registering user:", error.response.data);
    throw error;
  }
}

export { loginUser, registerUser };
