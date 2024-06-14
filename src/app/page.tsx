"use client";

import { useState } from "react";
import { trpc } from "../TRPCProvider";

export default function Home() {
  const [next, setNext] = useState("");

  const testPureNext = async () => {
    setNext("");
    const response = await fetch("/api/chat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok || !response.body) {
      throw new Error("ReadableStream not supported");
    }
    // @ts-ignore
    if (!response.body[Symbol.asyncIterator]) {
      // @ts-ignore
      response.body[Symbol.asyncIterator] = () => {
        // @ts-ignore
        const reader = response.body.getReader();
        return {
          next: () => reader.read(),
        };
      };
    }

    // @ts-ignore
    for await (const result of response.body) {
      const string = new TextDecoder().decode(result);
      setNext((prev) => prev + string);
      // Display loaded/total in the UI
    }
  };

  const { data, refetch } = trpc.iterable.useQuery(undefined, {
    enabled: false,
  });

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <button
        onClick={async () => {
          await testPureNext();
        }}
      >
        Click Me! (Pure Next)
      </button>
      <div>{next}</div>
      <button
        className="mt-24"
        onClick={async () => {
          await refetch();
        }}
      >
        Click Me! (TRPC)
      </button>
      <div>{data}</div>
    </main>
  );
}
