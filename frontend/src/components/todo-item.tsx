"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/checkbox";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  initialTodo: Todo;
}

export const TodoItem = ({ initialTodo }: TodoItemProps) => {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo>(initialTodo);

  useEffect(() => {
    setTodo(initialTodo);
  }, [initialTodo]);

  const updateTodo = useCallback(
    async (updatedFields: Partial<Omit<Todo, "id">>) => {
      const updatedTodo = { ...todo, ...updatedFields };
      setTodo(updatedTodo);

      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        if (!apiKey) {
          throw new Error("API key not found.");
        }

        const payload = {
          text: updatedTodo.text,
          completed: updatedTodo.completed,
        };

        const res = await fetch(
          `https://todosapi.egeuysal.com/v1/todos/${initialTodo.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (!res.ok) {
          throw new Error(`Failed: ${res.status}`);
        }

        router.refresh();
      } catch {
        setTodo(initialTodo);
      }
    },
    [initialTodo, router, todo]
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo((current) => ({ ...current, text: e.target.value }));
  };

  const handleTextBlur = () => {
    if (todo.text !== initialTodo.text) {
      updateTodo({ text: todo.text });
    }
  };

  const handleCompletedChange = (checked: boolean) => {
    updateTodo({ completed: checked });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex items-center gap-4 py-2">
      <Checkbox checked={todo.completed} onChange={handleCompletedChange} />
      <div className="flex-grow">
        <input
          className="text-2xl md:text-3xl lg:text-4xl font-bold line-clamp-2 focus:outline-none bg-transparent w-full"
          value={todo.text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          required
        />
        <p className="opacity-75">ID: {todo.id}</p>
      </div>
    </div>
  );
};
