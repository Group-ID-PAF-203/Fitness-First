import axios from "axios";
import { BASE_URL } from "../constants";

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });

      if (!response.status === 200) {
        throw new Error("Invalid username or password");
      }

      return response.data;
    } catch (error) {
      throw new Error("An error occurred during login");
    }
  }

  async register(username, password) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        username,
        password,
      });

      if (!response.status === 200) {
        throw new Error("Failed to register user");
      }

      return response.data;
    } catch (error) {
      throw new Error("An error occurred during registration");
    }
  }
}

export default new AuthService();
