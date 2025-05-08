import LeadBoard from "./LeadBoard";
import ListItem from "./ListItem";
import { useState, useContext } from "react";
import { AuthContex } from "./Auth";
// import reducer from "./reducer";

function Dashboard() {
  const { success } = useContext(AuthContex);
  return (
    <div className="dashboard">
      <div className={success ? "pop-up" : "pop-hide"}>
        <p>Thank You for Voting</p>
      </div>

      <ListItem />
      <LeadBoard />
    </div>
  );
}
export default Dashboard;
