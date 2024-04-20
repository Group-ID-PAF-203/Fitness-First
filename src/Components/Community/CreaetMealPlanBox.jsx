import React from "react";
import state from "../../Utils/Store";
import { useSnapshot } from "valtio";

const CreaetMealPlanBox = () => {
  const snap = useSnapshot(state);
  return (
    <div
      class="my_post"
      onClick={() => {
        state.createMealPlanOpened = true;
      }}
    >
      <div class="post_top">
        <img alt="alt-tag" src={snap.currentUser?.image} />
        <input
          type="text"
          placeholder={`Let's share your meal plan ${snap.currentUser?.username}`}
        />
      </div>
    </div>
  );
};

export default CreaetMealPlanBox;
