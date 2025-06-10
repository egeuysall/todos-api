import React from "react";

const Dashboard = () => {
  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <div className="w-[90%] flex flex-col gap-8 bg-neutral-900 p-4 rounded-lg">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Dashboard
        </h1>
        <h2 className="text-xl lg:text-2xl opacity-75">Create Todo</h2>
      </div>
    </main>
  );
};

export default Dashboard;
