import React from "react";
import { notFound } from "next/navigation";
import { RandomImage } from "@/components/random-image";
import { TodoItem } from "@/components/todo-item";

const Todos = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let todo: { id: string; text: string; completed: boolean } | null = null;

  try {
    const response = await fetch(
      `http://localhost:8080/v1/todos/${encodeURIComponent(id)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error. Status code: ${response.status}`);
    }

    todo = await response.json();
  } catch (error) {
    console.error(`Failed to fetch note: ${error}`);
    notFound();
  }

  if (!todo) {
    notFound();
  }

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <div className="w-[90%] flex flex-col lg:grid lg:grid-cols-4 gap-12 bg-neutral-900 p-4 rounded-lg">
        <RandomImage />
        <section className="lg:col-span-3 w-full flex gap-3 items-center">
          <TodoItem initialTodo={todo} />
        </section>
      </div>
    </main>
  );
};

export default Todos;
