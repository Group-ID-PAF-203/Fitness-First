import React, { useEffect } from "react";
import "../../Styles/center_section.css";
import TobBox from "./TobBox";
import MyPost from "./MyPost";
import FriendsPost from "./FriendsPost";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import PostService from "../../Services/PostService";
import CreateWorkoutPlanBox from "./CreateWorkoutPlanBox";
import WorkoutPlanCard from "./WorkoutPlanCard";
import CreaetMealPlanBox from "./CreaetMealPlanBox";
import MealPlanCard from "./MealPlanCard";
import FriendsSection from "./FriendsSection";
const CenterSection = () => {
  const snap = useSnapshot(state);
  useEffect(() => {
    PostService.getPosts()
      .then((resul) => {
        state.posts = resul;
      })
      .catch((err) => {});
  }, []);
  return (
    <div class="center">
      <TobBox />
      {snap.activeIndex === 0 && <MyPost />}
      {snap.activeIndex === 1 && <CreateWorkoutPlanBox />}
      {snap.activeIndex === 2 && <CreaetMealPlanBox />}
      {/* -------------------------------------- */}
      {snap.activeIndex === 0 && (
        <div>
          {snap.posts.map((post) => {
            return <FriendsPost key={post?.id} post={post} />;
          })}
        </div>
      )}
      {snap.activeIndex === 1 && (
        <div>
          {snap.workoutPlans.map((plan) => (
            <WorkoutPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
      {snap.activeIndex === 2 && (
        <div>
          {snap.mealPlans.map((plan) => (
            <MealPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
      {snap.activeIndex === 3 && <FriendsSection />}
    </div>
  );
};

export default CenterSection;
