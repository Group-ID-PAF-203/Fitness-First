import React, { useState } from "react";
import { Card, Button, Row } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import WorkoutPlanService from "../../Services/WorkoutPlanService";

const WorkoutPlanCard = ({ plan }) => {
  const snap = useSnapshot(state);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deletePlan = async () => {
    try {
      setDeleteLoading(true);
      await WorkoutPlanService.deleteWorkoutPlan(plan.id);
      state.workoutPlans = await WorkoutPlanService.getAllWorkoutPlans();
    } catch (error) {
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <Card
      title={plan.planName}
      headStyle={{ backgroundColor: "rgba(255, 255, 255, 0.4)", border: 0 }}
      style={{ background: "#1f2125", color: "white", marginBottom: "16px" }}
      bordered={false}
    >
      <p>Description: {plan.description}</p>
      <p>Goal: {plan.goal}</p>
      <p>Routine : {plan.routines}</p>
      {snap.currentUser.uid === plan.userId && (
        <Row style={{ gap: 8 }}>
          <Button
            onClick={() => {
              state.selectedWorkoutPlan = plan;
              state.editWorkoutPlanOpened = true;
            }}
            type="dashed"
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => {
              deletePlan();
            }}
            loading={deleteLoading}
            danger
            type="primary"
          >
            <DeleteOutlined />
          </Button>
        </Row>
      )}
    </Card>
  );
};

export default WorkoutPlanCard;
