import React, { useEffect, useState } from "react";
import UserConnectionService from "../../Services/UserConnectionService";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import axios from "axios";
import { Button, List, Avatar, Card } from "antd";
const FriendsSection = () => {
  const snap = useSnapshot(state);
  const [friends, setFriends] = useState([]);
  const [friendsUserNameData, setFriendsUserNameData] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    UserConnectionService.getUserConnections(snap.currentUser?.uid)
      .then(async (res) => {
        let friends = [];
        for (var friendId of res.friendIds) {
          const user = snap.users.find((user) => user.id === friendId);
          const users = await axios.get(
            "http://localhost:8080/api/users",
            config
          );

          setFriendsUserNameData(users.data);
          if (user) {
            const u = users.data.find((friend) => friend.id === user.userId);

            if (u) {
              friends.push({ ...u, ...user });
            }
          }
        }
        setFriends(friends);
      })
      .catch((err) => {});
  }, []);
  const unfriend = async (friendId) => {
    try {
      await UserConnectionService.deleteUserConnection(
        snap.currentUser.uid,
        friendId
      );

      const updatedFriends = friends.filter((friend) => friend.id !== friendId);
      setFriends(updatedFriends);
    } catch (error) {
      console.error("Error unfriending:", error);
    }
  };
  return (
    <div>
      <List
        dataSource={friends}
        renderItem={(friend) => (
          <Card
            style={{ background: "#1f2125", color: "white" }}
            bordered={false}
            key={friend.id}
          >
            <List.Item
              actions={[
                <Button
                  type="primary"
                  danger
                  onClick={() => unfriend(friend.id)}
                >
                  Unfriend
                </Button>,
              ]}
            >
              <List.Item.Meta
                style={{ color: "white", fontSize: "16px" }}
                avatar={<Avatar src={friend.image} size={64} />}
                title={
                  <span style={{ color: "white" }}>{friend.username}</span>
                }
                description={
                  <span style={{ color: "white" }}>{friend.biography}</span>
                }
              />
            </List.Item>
          </Card>
        )}
      />
    </div>
  );
};

export default FriendsSection;
