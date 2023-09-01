import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

function getHeaders() {
  const token = window.localStorage.getItem('token');
  return { 
     'Content-Type': 'application/json',
     'Authorization': token ? `Bearer ${token}` : null,
  };
}

async function loginUser(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error in logging in user:", error.response.data);
    
    throw error;
  }
}

async function registerUser(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error in registering user:", error.response.data);
    
    throw error;
  }
}

async function writingBoard(routeData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/writingBoard`, routeData, { headers: getHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error in saving routes with time:", error.response.data);
    
    throw error;
  }
}




export { loginUser, registerUser, writingBoard };
