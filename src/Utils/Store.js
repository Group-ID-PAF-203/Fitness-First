import { proxy } from "valtio";

const state = proxy({
  currentUser: null,
  profileModalOpend: false,
  createWorkoutStatusModalOpened: false,
  storyCards: [],
  workoutStoryOpen: false,
  selectedWorkoutStory: null,
  createPostModalOpened: false,
  posts: [],
  users: [],
  selectedPost: null,
  updatePostModalOpened: false,
  activeIndex: 0,
  createWorkoutPlanOpened: false,
  workoutPlans: [],
  editWorkoutPlanOpened: false,
  selectedWorkoutPlan: null,
  mealPlans: [],
  createMealPlanOpened: false,
  updateMealPlanOpened: false,
  seletedMealPlanToUpdate: null,
  selectedUserProfile: null,
  friendProfileModalOpened: false,
});

export default state;
