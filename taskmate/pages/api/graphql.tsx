import { ApolloServer } from "apollo-server-micro";
import { db } from "../../db/conntection";
import { schema } from "../../gql/schema";

const apolloServer = new ApolloServer({ schema, context: { db } });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
