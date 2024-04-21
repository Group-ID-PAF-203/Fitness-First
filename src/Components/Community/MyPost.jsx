import React from "react";
import state from "../../Utils/Store";
import { useSnapshot } from "valtio";

const MyPost = () => {
  const snap = useSnapshot(state);
  return (
    <div
      class="my_post"
      onClick={() => {
        state.createPostModalOpened = true;
      }}
    >
      <div class="post_top">
        <img alt="alt-tag" src={snap.currentUser?.image} />
        <input
          type="text"
          placeholder={`Whats on your mind ${snap.currentUser?.username}`}
        />
      </div>
    </div>
  );
};

export default MyPost;
