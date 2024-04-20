import React from "react";
import state from "../../Utils/Store";
import { useSnapshot } from "valtio";

const CreateWorkoutPlanBox = () => {
  const snap = useSnapshot(state);
  return (
    <div
      class="my_post"
      onClick={() => {
        state.createWorkoutPlanOpened = true;
      }}
    >
      <div class="post_top">
        <img alt="alt-tag" src={snap.currentUser?.image} />
        <input type="text" placeholder="What's workout plan?" />
      </div>
    </div>
  );
};

export default CreateWorkoutPlanBox;
