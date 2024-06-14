import { publicProcedure, router } from "../../../../server/trpc";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const appRouter = router({
  iterable: publicProcedure.query(async function* () {
    for (let i = 0; i < 15; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(i);
      yield i;
    }
  }),
});

export type AppRouter = typeof appRouter;

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };

// export type AppRouter = typeof appRouter;

// export default trpcNext.createNextApiHandler({
//   router: appRouter,
//   createContext: () => ({}),
// });
