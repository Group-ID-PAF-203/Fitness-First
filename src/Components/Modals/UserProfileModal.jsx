import React, { useState } from "react";
import { Modal, Switch, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import UploadFileService from "../../Services/UploadFileService";
import UserService from "../../Services/UserService";
const uploader = new UploadFileService();
const UserProfileModal = () => {
  const snap = useSnapshot(state);
  const [uploadUserLoading, setUploadUserLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    uid: snap.currentUser?.uid,
    username: snap.currentUser?.username,
    biography: snap.currentUser?.biography,
    fitnessGoals: snap.currentUser?.fitnessGoals,
    profileVisibility: snap.currentUser?.profileVisibility,
    image: snap.currentUser?.image,
  });

  const handleBiographyChange = (e) => {
    setUpdatedUser({ ...updatedUser, biography: e.target.value });
  };

  const handleFitnessGoalsChange = (e) => {
    setUpdatedUser({ ...updatedUser, fitnessGoals: e.target.value });
  };

  const handleProfileVisibilityChange = (checked) => {
    setUpdatedUser({ ...updatedUser, profileVisibility: checked });
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdateLoading(true);
      await UserService.updateUserPrifile(updatedUser);

      state.profileModalOpend = false;
      message.success("Profile updated successfully");
    } catch (error) {
      console.error("Error uploading file:", error.message);
      message.error("Profile updating failed");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleFileChange = async (info) => {
    if (info.file) {
      setUploadUserLoading(true);
      const url = await uploader.uploadFile(
        info.fileList[0].originFileObj,
        "userImages"
      );
      setUpdatedUser({ ...updatedUser, image: url });
    } else if (info.file.status === "removed") {
    }
    setUploadUserLoading(false);
  };

  return (
    <Modal
      open={snap.profileModalOpend}
      onCancel={() => {
        state.profileModalOpend = false;
      }}
      footer={[
        <Button key="cancel" onClick={() => (state.profileModalOpend = false)}>
          Cancel
        </Button>,
        <Button
          loading={updateLoading}
          key="update"
          type="primary"
          onClick={handleUpdateProfile}
        >
          Update
        </Button>,
      ]}
    >
      <h2>User Profile</h2>
      <div>
        <p>Username:</p>
        <Input value={updatedUser.username} disabled />
      </div>
      <div>
        <p>Biography:</p>
        <Input
          value={updatedUser.biography}
          onChange={handleBiographyChange}
          placeholder="Enter your biography"
        />
      </div>
      <div>
        <p>Fitness Goals:</p>
        <Input
          value={updatedUser.fitnessGoals}
          onChange={handleFitnessGoalsChange}
          placeholder="Enter your fitness goals"
        />
      </div>
      {!uploadUserLoading && (
        <div>
          <p>Profile Picture:</p>
          {updatedUser.image && (
            <img
              src={updatedUser.image}
              alt="Profile"
              style={{ maxWidth: "100%" }}
            />
          )}

          <Upload
            accept="image/*"
            onChange={handleFileChange}
            showUploadList={false}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </div>
      )}
      {uploadUserLoading && <p>Uploading profile picture...</p>}

      <div>
        <p>Profile Visibility:</p>
        <Switch
          checked={updatedUser.profileVisibility}
          onChange={handleProfileVisibilityChange}
        />
      </div>
    </Modal>
  );
};

export default UserProfileModal;
