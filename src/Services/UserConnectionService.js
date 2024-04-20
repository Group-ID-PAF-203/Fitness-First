import axios from "axios";

const API_URL = "http://localhost:8080/api/userConnections";

const UserConnectionService = {
  // Get user connections by user ID
  getUserConnections: async (userId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(`${API_URL}/${userId}`, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching user connections:", error);
      throw error;
    }
  },

  // Create a new user connection
  createUserConnection: async (userConnectionData) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.post(API_URL, userConnectionData, config);
      return response.data;
    } catch (error) {
      console.error("Error creating user connection:", error);
      throw error;
    }
  },

  deleteUserConnection: async (userId, friendId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.delete(
        `${API_URL}/${userId}/friends/${friendId}`,
        config
      );
      console.log(response.status);
      return response.data;
    } catch (error) {
      console.error("Error deleting user connection:", error);
      throw error;
    }
  },
};

export default UserConnectionService;
