import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import WorkoutPlanService from "../../Services/WorkoutPlanService";

const EditWorkoutPlanModal = () => {
  const snap = useSnapshot(state);
  const selectedPlan = snap.selectedWorkoutPlan;
  const [updateLoading, setUpdateLoading] = useState(false);
  const [form] = Form.useForm();

  const updateWorkoutPlan = async (values) => {
    try {
      setUpdateLoading(true);
      const body = { ...values, userId: snap.currentUser?.uid };
      await WorkoutPlanService.updateWorkoutPlan(selectedPlan.id, body);
      state.workoutPlans = await WorkoutPlanService.getAllWorkoutPlans();
      state.editWorkoutPlanOpened = false;
    } catch (error) {
      // Handle error
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {}, [snap.selectedWorkoutPlan]);

  return (
    <Modal
      footer={null}
      onCancel={() => {
        state.editWorkoutPlanOpened = false;
      }}
      visible={snap.editWorkoutPlanOpened}
    >
      <Form
        form={form}
        onFinish={updateWorkoutPlan}
        layout="vertical"
        initialValues={{
          planName: selectedPlan.planName,
          description: selectedPlan.description,
          goal: selectedPlan.goal,
          routines: selectedPlan.routines,
        }}
      >
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
          rules={[{ required: true, message: "Please enter routines" }]}
        >
          <Input placeholder="How you going to archive this goal" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={updateLoading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditWorkoutPlanModal;
