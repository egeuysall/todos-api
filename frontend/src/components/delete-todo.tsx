"use client";

import React from "react";
import { useRouter } from "next/navigation";

type DeleteProps = {
  id: string;
};

export const DeleteTodo: React.FC<DeleteProps> = ({ id }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API key not found.");
      }

      const res = await fetch(
        `https://todosapi.egeuysal.com/v1/todos/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
      }

      router.refresh();
    } catch (err) {
      console.error(`Error:${err}`);
    }
  };

  return (
    <button
      className="py-2 px-3 font-bold text-black bg-white rounded-lg transition duration-200 hover:opacity-75 w-full"
      onClick={handleDelete}
    >
      Delete Todo
    </button>
  );
};
