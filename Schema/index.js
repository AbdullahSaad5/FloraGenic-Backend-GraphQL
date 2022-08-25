import { gql } from "apollo-server-express";
import {
  CustomerTypes,
  CustomerQuery,
  CustomerMutation,
  CustomerResolvers,
} from "./Customers/index.js";

// remember we only use gql in this file. types in other files are just simple strings
export const typeDefs = gql`
  type Query
  type Mutation
  ${CustomerTypes}
`;
export const resolvers = {
  Query: {
    ...CustomerQuery,
  },
  Mutation: {
    ...CustomerMutation,
  },
  Customer: CustomerResolvers,
};
