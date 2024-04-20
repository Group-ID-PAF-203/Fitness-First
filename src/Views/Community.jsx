import React, { useEffect } from "react";
import Navbar from "../Components/Community/Navbar";
import "../Styles/community.css";
import LeftSection from "../Components/Community/LeftSection";
import CenterSection from "../Components/Community/CenterSection";
import RightSection from "../Components/Community/RightSection";
import UserProfileModal from "../Components/Modals/UserProfileModal";
import CreateWorkoutStoryModal from "../Components/Modals/CreateWorkoutStoryModal";
import WorkoutStory from "../Components/Modals/WorkoutStory";
import WorkoutStoryService from "../Services/WorkoutStoryService";
import state from "../Utils/Store";
import { useSnapshot } from "valtio";
import CreatePostModal from "../Components/Modals/CreatePostModal";
import UserService from "../Services/UserService";
import UploadPostModal from "../Components/Modals/UploadPostModal";
import CreateWorkoutPlan from "../Components/Modals/CreateWorkoutPlan";
import WorkoutPlanService from "../Services/WorkoutPlanService";
import EditWorkoutPlanModal from "../Components/Modals/EditWorkoutPlanModal";
import UpdateMealPlanModal from "../Components/Modals/UpdateMealPlanModal";
import CreateMealPlanModal from "../Components/Modals/CreateMealPlanModal";
import MealPlanService from "../Services/MealPlanService";
import FriendProfileModal from "../Components/Modals/FriendProfileModal";
const Community = () => {
  const snap = useSnapshot(state);
  const getWorkoutStories = async () => {
    try {
      const response = await WorkoutStoryService.getAllWorkoutStories();
      state.storyCards = response;
    } catch (error) {
      console.log("Failed to fetch workout stories", error);
    }
  };
  const getAllUsrs = async () => {
    try {
      const response = await UserService.getProfiles();
      state.users = response;
    } catch (error) {
      console.log("Failed to fetch users", error);
    }
  };
  const getWorkoutPlans = async () => {
    try {
      const response = await WorkoutPlanService.getAllWorkoutPlans();
      state.workoutPlans = response;
    } catch (error) {
      console.log("Failed to fetch workout plans ", error);
    }
  };
  const getMealPlans = async () => {
    try {
      const response = await MealPlanService.getAllMealPlans();
      state.mealPlans = response;
    } catch (error) {}
  };
  useEffect(() => {
    getAllUsrs().then(() => {
      getWorkoutStories();

      getWorkoutPlans();
      getMealPlans();
    });
  }, []);
  return (
    <div className="community-body">
      <Navbar />
      <div className="main">
        <LeftSection />
        <CenterSection />
        <RightSection />
      </div>
      <UserProfileModal />
      <CreateWorkoutStoryModal />
      <CreateWorkoutPlan />
      <CreateMealPlanModal />
      {snap.selectedWorkoutStory && <WorkoutStory />}
      <CreatePostModal />
      {snap.selectedPost && <UploadPostModal />}
      {snap.selectedWorkoutPlan && <EditWorkoutPlanModal />}
      {snap.seletedMealPlanToUpdate && <UpdateMealPlanModal />}
      {snap.selectedUserProfile && <FriendProfileModal />}
    </div>
  );
};

export default Community;
