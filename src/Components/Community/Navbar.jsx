import React from "react";
import "../../Styles/navbar.css";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import NotificationsDropdown from "./NotificationsDropdown";
const Navbar = () => {
  const snap = useSnapshot(state);
  const currentUser = snap.currentUser;

  return (
    <nav id="nav-bar">
      <div class="left">
        <div class="logo">
          <img alt="alt-tag" src="assets/logo.png" />
        </div>
      </div>

      <div class="right">
        <NotificationsDropdown />
        <img
          onClick={() => {
            state.profileModalOpend = true;
          }}
          alt="alt-tag"
          src={currentUser?.image}
        />
      </div>
    </nav>
  );
};

export default Navbar;
