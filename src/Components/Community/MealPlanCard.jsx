import React, { useState } from "react";
import { Card } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import MealPlanService from "../../Services/MealPlanService";
const MealPlanCard = ({ plan }) => {
  const snap = useSnapshot(state);
  const [deleteLoading, setIsDeleteLoading] = useState(false);
  const deletePlan = async () => {
    try {
      setIsDeleteLoading(true);
      await MealPlanService.deleteMealPlan(plan.id);
      state.mealPlans = await MealPlanService.getAllMealPlans();
    } catch (error) {
    } finally {
      setIsDeleteLoading(false);
    }
  };
  return (
    <Card
      title="Meal Plan"
      style={{
        width: "100%",
        backgroundColor: "#1f2125",
        color: "white",
        marginBottom: 8,
      }}
      headStyle={{ color: "white" }}
      bordered={false}
    >
      <img src={plan.mediaUrl} style={{ width: "100%", height: 400 }} />
      <p>Meal Details: {plan.mealDetails}</p>
      <p>Dietary Preferences: {plan.dietaryPreferences}</p>
      <p>Ingradients: {plan.ingredients}</p>
      {plan.userId === snap.currentUser?.uid && (
        <Row style={{ gap: 8 }}>
          <Button
            onClick={() => {
              state.seletedMealPlanToUpdate = plan;
              state.updateMealPlanOpened = true;
            }}
            type="dashed"
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={deletePlan}
            loading={deleteLoading}
            danger
            type="dashed"
          >
            <DeleteOutlined />
          </Button>
        </Row>
      )}
    </Card>
  );
};

export default MealPlanCard;
