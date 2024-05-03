import React from "react";
import TicketManagementBoard from "./_components/ticket-management-board";

const TicketManagementPage = async () => {
  return (
    <div className="h-full w-full p-4 pb-1 pr-0">
      <TicketManagementBoard />
    </div>
  );
};

export default TicketManagementPage;
