import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  AuthenticationError,
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
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader;
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = user;
    } catch (error) {
      console.error(error);
    }
  }
  next();
}

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(cors());
  app.use(authMiddleware);
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = req.user || null;
      return { user };
    },
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
