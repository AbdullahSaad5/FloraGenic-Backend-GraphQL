import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import morgan from "morgan";
import db from "./connection.js";
import { resolvers, typeDefs } from "./Schema/index.js";
dotenv.config();

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(morgan("dev"));
  app.use(cors());
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
    csrfPrevention: true,
    logger: console,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  // Connect to MongoDB
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to Mongoose"));

  // Staring server
  await server.start();
  server.applyMiddleware({ app });

  app.use("/", (_, res) => {
    res.send("Hello to GraphQL Server");
  });

  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
