"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Form = () => {
  const [id, setId] = useState<string>("");
  const router = useRouter();

  const buttonClass =
    "py-2 px-3 font-bold text-black bg-white rounded-lg transition duration-200 hover:opacity-75";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id.trim()) {
      alert("Please enter a note ID");
      return;
    }

    router.push(`/v1/todos/${encodeURIComponent(id.trim())}`);
  };

  const handleGet = () => {
    if (!id.trim()) {
      alert("Please enter a note ID");
      return;
    }

    router.push(`/v1/todos/${encodeURIComponent(id.trim())}`);
  };

  return (
    <section className="w-full">
      <form
        className="w-full flex flex-col md:grid md:grid-cols-4 gap-3"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Enter note id"
          autoFocus
          required
          className="col-span-2 rounded-lg py-2 px-3 border border-neutral-800"
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
        <button
          type="button"
          className={buttonClass}
          onClick={handleGet}
          disabled={!id.trim()}
        >
          Get Todo
        </button>
        <Link href="/dashboard" className="w-full">
          <button type="button" className={`${buttonClass} w-full`}>
            View Dashboard
          </button>
        </Link>
      </form>
    </section>
  );
};
