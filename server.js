import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import morgan from "morgan";
import { resolvers, typeDefs } from "./Schema/index.js";
import dotenv from "dotenv";
import cors from "cors";
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

  //   starting mongoose connection
  await mongoose.connect(process.env.MONGO_DB_URI);
  console.log("mongoose connected");

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
