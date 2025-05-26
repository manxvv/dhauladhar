import { Outlet } from "react-router-dom";
import React from "react";
 const Dashboard = () => {


  
    return (
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          <h1 className="text-3xl font-bold">Dashboard</h1>
         <Outlet/>

        </div>
      </div>
    );
  };

  export default Dashboard;
  