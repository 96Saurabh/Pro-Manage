import axios from "axios";
 const apiUrl = 'https://project-backend-six.vercel.app';
  const backendUrl = `${apiUrl}/auth`;



export const registerUser = async ({ name, email, password }) => {
  try {
    const requestUrl = `${backendUrl}/register`;
    const reqPayload = { name, email, password };

    const response = await axios.post(requestUrl, reqPayload);

    return response?.data;
  } catch (error) {
    // Check if there's a response from the server
    if (error.response) {
      // Return the response data which contains the error message
      return error.response.data;
    } else {
      // Handle other errors (like network issues)
      return {
        message: "Network error: Please try again later",
        success: false,
      };
    }
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const requestUrl = `${backendUrl}/login`;
    const reqPayload = { email, password };
    const response = await axios.post(requestUrl, reqPayload);
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const updateUsernameOrPassword = async ({ name, password }) => {
  try {
    const requestUrl = `${backendUrl}/settings/update`;
    const reqPayload = { name, password };
    const token = localStorage.getItem("tokenPro");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(requestUrl, reqPayload);
    return response?.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
  }
};
