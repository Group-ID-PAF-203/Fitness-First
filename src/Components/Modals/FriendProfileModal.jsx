import React, { useEffect, useState } from "react";
import { Modal, Tabs, Avatar, Row, Col, Button, message } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import axios from "axios";
import { BASE_URL } from "../../constants";
import FriendsPost from "../Community/FriendsPost";
import "../../Styles/center_section.css";
import "../../Styles/right_section.css";
import "../../Styles/community.css";
import "../../Styles/left_section.css";
import WorkoutPlanCard from "../Community/WorkoutPlanCard";
import MealPlanCard from "../Community/MealPlanCard";
import UserConnectionService from "../../Services/UserConnectionService";
const { TabPane } = Tabs;

const FriendProfileModal = () => {
  const snap = useSnapshot(state);
  const [userData, setUserData] = useState();
  const [isFriend, setIsFriend] = useState(false);
  const [addFriendLoading, setAddFriendLoading] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get(`${BASE_URL}/users/${snap.selectedUserProfile?.userId}`, config)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {});
  }, [snap.selectedUserProfile]);

  const addFriend = async () => {
    if (!isFriend) {
      try {
        const body = {
          userId: snap.currentUser?.uid,
          friendIds: [snap.selectedUserProfile?.id],
        };
        await UserConnectionService.createUserConnection(body);
        message.success("Friend added successfully!");
        setIsFriend(true);
      } catch (error) {
        console.error("Error adding friend:", error);
        message.error("Failed to add friend. Please try again later.");
      }
    } else {
      message.warning("You are already friends with this user.");
    }
  };
  const checkFriendshipStatus = async () => {
    try {
      const connections = await UserConnectionService.getUserConnections(
        snap.currentUser?.uid
      );
      if (connections.friendIds.includes(snap.selectedUserProfile.id)) {
        setIsFriend(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unfriendFriend = async () => {
    try {
      setAddFriendLoading(true);
      await UserConnectionService.deleteUserConnection(
        snap.currentUser?.uid,
        snap.selectedUserProfile?.id
      );
      setIsFriend(false);
      message.info("Unfriend successfully");
    } catch (error) {
    } finally {
      setAddFriendLoading(false);
    }
  };

  useEffect(() => {
    checkFriendshipStatus();
  }, []);

  return (
    <Modal
      onCancel={() => {
        state.friendProfileModalOpened = false;
      }}
      width={1200}
      footer={null}
      open={snap.friendProfileModalOpened}
    >
      <Row style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <h1>{userData?.username}</h1>
          <h2>{snap.selectedUserProfile?.biography}</h2>
          <Avatar size={64} src={snap.selectedUserProfile?.image} />
          {snap.selectedUserProfile?.id !== snap.currentUser?.uid && (
            <div>
              {isFriend ? (
                <Button
                  danger
                  type="dashed"
                  onClick={unfriendFriend}
                  loading={addFriendLoading}
                >
                  Unfriend
                </Button>
              ) : (
                <Button
                  type="primary"
                  loading={addFriendLoading}
                  onClick={addFriend}
                >
                  Add Friend
                </Button>
              )}
            </div>
          )}
        </div>
      </Row>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Posts" key="1">
          <Row gutter={[16, 16]}>
            {snap.posts
              .filter((post) => post.userId === snap.selectedUserProfile.id)
              .map((post) => (
                <Col key={post.id} span={6}>
                  <div style={{ padding: "8px", border: "1px solid #eaeaea" }}>
                    <img src={post.mediaLink} style={{ height: "100%" }} />
                  </div>
                </Col>
              ))}
          </Row>
        </TabPane>
        <TabPane tab="Workout Plans" key="2">
          <Row gutter={[16, 16]}>
            {snap.workoutPlans
              .filter((plan) => plan.userId === snap.selectedUserProfile?.id)
              .map((post) => (
                <Col key={post.id} span={6}>
                  <WorkoutPlanCard plan={post} />
                </Col>
              ))}
          </Row>
        </TabPane>
        <TabPane tab="Meal Plans" key="3">
          <Row gutter={[16, 16]}>
            {snap.mealPlans
              .filter((plan) => plan.userId === snap.selectedUserProfile?.id)
              .map((post) => (
                <Col key={post.id} span={6}>
                  <MealPlanCard plan={post} />
                </Col>
              ))}
          </Row>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default FriendProfileModal;
