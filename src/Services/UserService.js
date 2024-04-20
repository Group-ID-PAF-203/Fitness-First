import axios from "axios";
import { BASE_URL } from "../constants";

const UserService = {
  async checkIfUserExists(username) {
    try {
      const response = await axios.get(`${BASE_URL}/users/exists/${username}`);
      return response.data;
    } catch (error) {
      throw new Error("An error occurred while checking if the user exists");
    }
  },

  async createProfile(body) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/userProfiles`,
        body,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error("An error occurred while checking if the user exists");
    }
  },

  async getProfileById(id) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/userProfiles/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error("An error occurred while checking if the user exists");
    }
  },
  async getProfiles() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(`${BASE_URL}/userProfiles`, config);
      return response.data;
    } catch (error) {
      throw new Error("An error occurred while checking if the user exists");
    }
  },

  async getProfile() {
    const uid = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get(`${BASE_URL}/users/${uid}`, config);
    const reponse2 = await axios.get(
      `${BASE_URL}/userProfiles/user/${uid}`,
      config
    );
    return {
      ...response.data,

      ...reponse2.data[0],
      uid: reponse2.data[0].id,
    };
  },

  async updateUserPrifile(data) {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      await axios.put(`${BASE_URL}/userProfiles/${data.uid}`, data, config);
    } catch (error) {
      throw new Error("An error occurred while updating user profile");
    }
  },
};

export default UserService;
