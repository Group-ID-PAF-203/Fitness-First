import React from "react";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import StoryCard from "./StoryCard";

const TobBox = () => {
  const snap = useSnapshot(state);
  return (
    <div class="top_box">
      <div
        onClick={() => {
          state.createWorkoutStatusModalOpened = true;
        }}
        class="my_story_card"
      >
        <img alt="alt-tag" src={snap.currentUser?.image} />

        <div class="story_upload">
          <img alt="alt-tag" src="image/upload.png" />
          <p class="story_tag" style={{ textAlign: "center" }}>
            Create workout story
          </p>
        </div>
      </div>
      {snap.storyCards.map((card) => (
        <StoryCard key={card?.id} card={card} />
      ))}
    </div>
  );
};

export default TobBox;
