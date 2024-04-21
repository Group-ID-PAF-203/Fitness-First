import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, Select } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import MealPlanService from "../../Services/MealPlanService";
import UploadFileService from "../../Services/UploadFileService";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;
const uploader = new UploadFileService();

const CreateMealPlanModal = () => {
  const snap = useSnapshot(state);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [imageUploading, setImageUploading] = useState(false);
  const [fileType, setFileType] = useState("image");
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Call the service to create the meal plan
      await MealPlanService.createMealPlan({
        ...values,
        userId: snap.currentUser?.uid,
        mediaUrl: image,
      });
      state.mealPlans = await MealPlanService.getAllMealPlans();
      // Reset the form and close the modal on success
      form.resetFields();
      setImage(null);
      state.createMealPlanOpened = false;
    } catch (error) {
      console.error("Error creating meal plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (info) => {
    if (info.file) {
      setImageUploading(true);
      const fileType = info.file.type.split("/")[0];
      setFileType(fileType);
      const url = await uploader.uploadFile(
        info.fileList[0].originFileObj,
        "posts"
      );
      setImage(url);
    } else if (info.file.status === "removed") {
    }
    setImageUploading(false);
  };

  return (
    <Modal
      open={snap.createMealPlanOpened}
      footer={null}
      onCancel={() => {
        state.createMealPlanOpened = false;
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="mealDetails"
          label="Meal Details"
          rules={[{ required: true, message: "Please enter meal details" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="dietaryPreferences"
          label="Dietary Preferences"
          rules={[
            { required: true, message: "Please select dietary preferences" },
          ]}
        >
          <Select>
            <Option value="vegetarian">Vegetarian</Option>
            <Option value="vegan">Vegan</Option>
            <Option value="keto">Keto</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="ingredients"
          label="Ingrediants"
          rules={[{ required: true, message: "Please enter ingradients" }]}
        >
          <Input.TextArea />
        </Form.Item>
        {image && <img src={image} style={{ width: "100%", height: "auto" }} />}
        {imageUploading && <p>Media is uploading please wait</p>}
        {!imageUploading && (
          <Form.Item
            name="mediaLink"
            label="Media Link"
            rules={[{ required: true, message: "Please enter media link" }]}
          >
            <Upload
              accept="image/*,video/*"
              onChange={handleFileChange}
              showUploadList={false}
              beforeUpload={() => false}
              style={{ marginBottom: "1rem" }}
            >
              <Button icon={<UploadOutlined />}>Upload Media</Button>
            </Upload>
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Meal Plan
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMealPlanModal;
