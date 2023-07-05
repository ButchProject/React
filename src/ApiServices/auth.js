// api-service.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";


async function loginUser(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error in logging in user:", error.response.data);
    
    throw error;
  }
}

async function registerUser(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error in registering user:", error.response.data);
    throw error;
  }
}

export { loginUser, registerUser };
