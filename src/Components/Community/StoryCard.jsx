import React, { useEffect, useState } from "react";
import UserService from "../../Services/UserService";
import state from "../../Utils/Store";

const StoryCard = ({ card }) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    UserService.getProfileById(card.userId)
      .then((value) => {
        setUserData(value);
      })
      .catch((err) => {
        console.log(`error getting user data ${err}`);
      });
  }, [card]);
  return (
    <div
      onClick={() => {
        state.selectedWorkoutStory = card;
        state.workoutStoryOpen = true;
      }}
      class="story_card"
    >
      <img alt="alt-tag" src={card?.image} />

      <div class="story_profile">
        <img alt="alt-tag" src={userData?.image} />
        <div class="cricle"></div>
      </div>

      <div class="story_name">
        <p class="name">{userData?.username}</p>
      </div>
    </div>
  );
};

export default StoryCard;
