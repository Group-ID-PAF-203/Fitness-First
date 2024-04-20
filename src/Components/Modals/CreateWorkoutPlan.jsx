import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import WorkoutPlanService from "../../Services/WorkoutPlanService";

const CreateWorkoutPlan = () => {
  const snap = useSnapshot(state);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Create workout plan data object
      const workoutPlanData = {
        userId: snap.currentUser?.uid,
        planName: values.planName,
        description: values.description,
        goal: values.goal,
        routines: values.routines,
      };

      await WorkoutPlanService.createWorkoutPlan(workoutPlanData);
      state.workoutPlans = await WorkoutPlanService.getAllWorkoutPlans();
      // Reset form and close modal
      form.resetFields();
      state.createWorkoutPlanOpened = false;
    } catch (error) {
      console.error("Form validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      footer={null}
      visible={snap.createWorkoutPlanOpened}
      onCancel={() => {
        state.createWorkoutPlanOpened = false;
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="planName"
          label="Plan Name"
          rules={[{ required: true, message: "Please enter plan name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="goal"
          label="Goal"
          rules={[{ required: true, message: "Please enter goal" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="routines"
          label="Routines"
          rules={[{ required: true, message: "Please enter routine" }]}
        >
          <Input.TextArea placeholder="Your routine to archive the goal" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Workout Plan
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateWorkoutPlan;
