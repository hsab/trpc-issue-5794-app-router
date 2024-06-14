import { initTRPC } from "@trpc/server";

const t = initTRPC.create({
  experimental: {
    iterablesAndDeferreds: true,
  },
});

export const publicProcedure = t.procedure;

export const router = t.router;
