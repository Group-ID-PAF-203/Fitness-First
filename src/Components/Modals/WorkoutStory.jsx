import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import UploadFileService from "../../Services/UploadFileService";
import WorkoutStoryService from "../../Services/WorkoutStoryService";

const uploadService = new UploadFileService();

const WorkoutStory = () => {
  const snap = useSnapshot(state);
  const userId = snap.currentUser?.id;
  const workoutStory = snap.selectedWorkoutStory;
  const [imageUploading, setImageUploading] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  useEffect(() => {
    form.setFieldsValue({
      title: workoutStory?.title,
      description: workoutStory?.description,
    });
  }, [workoutStory]);

  const [updatedStory, setUpdatedStory] = useState({
    title: workoutStory?.title || "",
    image: workoutStory?.image || "",
    description: workoutStory?.description || "",
  });

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await WorkoutStoryService.updateWorkoutStory(
        snap.selectedWorkoutStory.id,
        updatedStory
      );
      state.storyCards = await WorkoutStoryService.getAllWorkoutStories();
      message.success("Successfully updated");
      form.resetFields();
    } catch (error) {
      message.success("Error while deleting story");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await WorkoutStoryService.deleteWorkoutStory(
        snap.selectedWorkoutStory.id
      );
      state.storyCards = await WorkoutStoryService.getAllWorkoutStories();
      message.success("Workout story deleted successfully");
    } catch (error) {
      message.error("Failed to delete story");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form fields to initial values
    setUpdatedStory({
      title: workoutStory?.title || "",
      image: workoutStory?.image || "",
      description: workoutStory?.description || "",
    });
  };

  const handleFileChange = async (info) => {
    console.log(info);
    if (info.file) {
      setImageUploading(true);
      try {
        const uploadedImageUrl = await uploadService.uploadFile(
          info.fileList[0].originFileObj, // The file object
          "workoutStories" // The path in Firebase Storage
        );

        // Update state with the uploaded image URL
        setUpdatedStory({ ...updatedStory, image: uploadedImageUrl });
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setImageUploading(false);
      }
    }
  };

  return (
    <Modal
      title={workoutStory.title}
      open={snap.workoutStoryOpen}
      onCancel={() => {
        state.workoutStoryOpen = false;
      }}
      footer={[
        userId === workoutStory.userId && (
          <div key="editingButtons">
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              loading={loading}
              style={{ marginRight: 8, marginLeft: 8 }}
              key="submit"
              type="primary"
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              loading={deleteLoading}
              danger
              key="delete"
              type="dashed"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        ),
      ]}
    >
      {userId !== workoutStory.userId && (
        <div>
          <div style={{ maxHeight: 400 }}>
            <img src={workoutStory?.image} height={300} alt="Workout Story" />
          </div>
          <p>{workoutStory?.description}</p>
        </div>
      )}
      {userId === workoutStory.userId && (
        <Form form={form} layout="vertical">
          <div style={{ maxHeight: 400 }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={workoutStory?.image}
              alt="Workout Story"
            />
          </div>
          <Form.Item label="Title" name="title">
            <Input
              value={updatedStory.title}
              onChange={(e) =>
                setUpdatedStory({ ...updatedStory, title: e.target.value })
              }
            />
          </Form.Item>
          {imageUploading ? (
            <p>Please wait image uploading</p>
          ) : (
            <Form.Item label="Image" name="image">
              <Upload
                beforeUpload={() => false} // Prevent default upload behavior
                onChange={handleFileChange}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </Form.Item>
          )}
          <Form.Item label="Description" name="description">
            <Input.TextArea
              value={updatedStory.description}
              onChange={(e) =>
                setUpdatedStory({
                  ...updatedStory,
                  description: e.target.value,
                })
              }
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default WorkoutStory;
