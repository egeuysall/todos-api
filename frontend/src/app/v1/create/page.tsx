"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";

const Dashboard: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      text: todo,
      completed: false,
    };

    try {
      const res = await fetch("https://todosapi.egeuysal.com/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
      }

      setTodo("");
      setSent(true);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  return sent ? (
    <main className="flex flex-col h-screen items-center justify-center">
      <div className="w-[90%] flex flex-col bg-neutral-900 gap-3 p-4 rounded-lg">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Todo is successfully sent!
        </h1>
        <h2 className="text-xl lg:text-2xl opacity-75">
          Reload the page to send another todo.
        </h2>
        <Link href="/">
          <button className="py-2 px-3 font-bold text-black bg-white rounded-lg transition duration-200 hover:opacity-75 w-full md:w-auto">
            Go Home
          </button>
        </Link>
      </div>
    </main>
  ) : (
    <main className="flex flex-col h-screen items-center justify-center">
      <div className="w-[90%] flex flex-col gap-6 bg-neutral-900 p-4 rounded-lg">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Create Todo
        </h1>
        <form
          className="md:grid md:grid-cols-4 gap-3 flex flex-col"
          onSubmit={handleCreate}
        >
          <input
            className="rounded-lg py-2 px-3 border border-neutral-800 w-full md:col-span-3"
            placeholder="Enter todo"
            autoFocus
            required
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="md:col-span-1 py-2 px-3 font-bold text-black bg-white rounded-lg transition duration-200 hover:opacity-75 w-full">
            Create todo
          </button>
        </form>
      </div>
    </main>
  );
};

export default Dashboard;
