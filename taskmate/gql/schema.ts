import { makeExecutableSchema } from "graphql-tools";
import { typeDefs } from "./Types";
import { resolvers } from "./Resolvers";
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
