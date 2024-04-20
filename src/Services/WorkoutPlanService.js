// WorkoutPlanService.js

import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

class WorkoutPlanService {
  async getAllWorkoutPlans() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(`${BASE_URL}/workoutPlans`, config);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch workout plans");
    }
  }

  async getWorkoutPlanById(id) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/workoutPlans/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch workout plan");
    }
  }

  async createWorkoutPlan(workoutPlanData) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/workoutPlans`,
        workoutPlanData,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create workout plan");
    }
  }

  async updateWorkoutPlan(id, workoutPlanData) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.put(
        `${BASE_URL}/workoutPlans/${id}`,
        workoutPlanData,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update workout plan");
    }
  }

  async deleteWorkoutPlan(id) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await axios.delete(`${BASE_URL}/workoutPlans/${id}`, config);
    } catch (error) {
      throw new Error("Failed to delete workout plan");
    }
  }
}

export default new WorkoutPlanService();
