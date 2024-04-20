import axios from "axios";
import { BASE_URL } from "../constants";
import NotificationService from "./NotificationService";

class CommentService {
  async createComment(commentData, username, userId) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.post(
        `${BASE_URL}/comments`,
        commentData,
        config
      );
      if (response.status === 200) {
        try {
          const body = {
            userId: userId,
            message: "You have a new comment",
            description: "Your post commented by " + username,
          };

          await NotificationService.createNotification(body);
        } catch (error) {}
      }
      return response.data;
    } catch (error) {
      throw new Error("Failed to create comment");
    }
  }

  async getCommentsByPostId(postId) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${BASE_URL}/comments/post/${postId}`,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to get comments by post ID");
    }
  }

  async updateComment(commentId, commentData) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.put(
        `${BASE_URL}/comments/${commentId}`,
        commentData,
        config
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update comment");
    }
  }

  async deleteComment(commentId) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await axios.delete(`${BASE_URL}/comments/${commentId}`, config);
    } catch (error) {
      throw new Error("Failed to delete comment");
    }
  }
}

export default new CommentService();
