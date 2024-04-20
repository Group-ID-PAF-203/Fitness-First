import React from "react";
import "../../Styles/left_section.css";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
const LeftSection = () => {
  const snap = useSnapshot(state);
  const handleContext = (index) => {
    state.activeIndex = index;
  };
  return (
    <div class="left">
      <div
        onClick={() => {
          state.profileModalOpend = true;
        }}
        class="img"
      >
        <img alt="alt-tag" src={snap.currentUser?.image} />
        <p>{snap.currentUser?.username}</p>
      </div>
      <div
        onClick={() => {
          handleContext(0);
        }}
        class="img"
      >
        <img alt="alt-tag" src="image/watch.png" />
        <p>Posts</p>
      </div>

      <div
        onClick={() => {
          handleContext(1);
        }}
        class="img"
      >
        <img alt="alt-tag" src="image/saved.png" />
        <p>Workout Plans</p>
      </div>

      <div
        onClick={() => {
          handleContext(2);
        }}
        class="img"
      >
        <img alt="alt-tag" src="image/marketplace.png" />
        <p>Meal Plans</p>
      </div>

      <div
        onClick={() => {
          handleContext(3);
        }}
        class="img"
      >
        <img alt="alt-tag" src="image/friend.png" />
        <p>Friends</p>
      </div>

      <hr />
    </div>
  );
};

export default LeftSection;
