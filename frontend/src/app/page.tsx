import React from "react";
import { Form } from "@/components/form";
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col h-screen items-center">
      <div className="w-[90%] flex flex-col gap-6">
        <section>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Todos API
          </h1>
          <h2 className="text-xl lg:text-2xl opacity-75">
            Create. Track. Complete.
          </h2>
        </section>
        <Form />
        <Image
          className="rounded-lg hover:opacity-75 transition duration-200 pb-12"
          width={2048}
          height={1024}
          alt="Backend image"
          src="/backend.png"
        />
      </div>
    </main>
  );
};

export default Home;
