import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import SellerDashboard from "./SellerDashboard/index";
import BuyerDashboard from "./BuyerDashboard/index";

const Dashboard = ({ onLogout }) => {
  const { user } = useContext(UserContext);

  if (user && user.role === "seller") {
    return <SellerDashboard onLogout={onLogout} />;
  } else {
    return <BuyerDashboard onLogout={onLogout} />;
  }
};

export default Dashboard;
