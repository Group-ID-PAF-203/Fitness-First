import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import MealPlanService from "../../Services/MealPlanService";
const { Option } = Select;
const UpdateMealPlanModal = () => {
  const snap = useSnapshot(state);
  const selectedMealPlan = snap.seletedMealPlanToUpdate;
  const [updateMealPlanLoading, setUpdateMealPlanLoading] = useState(false);
  const [form] = Form.useForm();

  const updatePlan = async (values) => {
    try {
      setUpdateMealPlanLoading(true);
      await MealPlanService.updateMealPlan(selectedMealPlan.id, {
        ...values,
        userId: snap.currentUser.uid,
        mediaUrl: snap.seletedMealPlanToUpdate.mediaUrl,
      });
      state.mealPlans = await MealPlanService.getAllMealPlans();
      state.updateMealPlanOpened = false;
    } catch (error) {
      console.error("Error updating meal plan:", error);
    } finally {
      setUpdateMealPlanLoading(false);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      mealDetails: selectedMealPlan.mealDetails,
      dietaryPreferences: selectedMealPlan.dietaryPreferences,
      mediaUrl: selectedMealPlan.mealDetails,
      ingredients: selectedMealPlan.ingredients,
    });
  }, [snap.selectedMealPlan]);

  return (
    <Modal
      footer={null}
      onCancel={() => {
        state.updateMealPlanOpened = false;
      }}
      open={snap.updateMealPlanOpened}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={updatePlan}
        initialValues={{
          mealDetails: selectedMealPlan.mealDetails,
          dietaryPreferences: selectedMealPlan.dietaryPreferences,
        }}
      >
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
            {
              required: true,
              message: "Please enter dietary preferences",
            },
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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={updateMealPlanLoading}
          >
            Update Meal Plan
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateMealPlanModal;
