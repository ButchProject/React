import axios from "axios";

async function loginUser(userData) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error in logging in user:", error.response.data);
    
    throw error;
  }
}

async function registerUser(userData) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error in registering user:", error.response.data);
    
    throw error;
  }
}

async function writingBoard(routeData) {
  try {
    const token = window.localStorage.getItem('token');
    
    const config = { 
      headers: { 
        'Authorization': token ? `Bearer ${token}` : null
      }
    };

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/writingBoard`, routeData, config);

   return response.data;

  } catch (error) {

   console.error("Error in saving routes with time:", error.response.data);

   throw error;
 }
}

export { loginUser, registerUser, writingBoard };

