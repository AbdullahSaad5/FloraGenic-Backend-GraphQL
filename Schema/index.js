import { gql } from "apollo-server-express";
import {
  CustomerTypes,
  CustomerQuery,
  CustomerMutation,
  CustomerResolvers,
} from "./Customers/index.js";

import {
  UserTypes,
  UserQuery,
  UserMutation,
  UserResolvers,
} from "./Users/index.js";

import {
  AdminTypes,
  AdminQuery,
  AdminMutation,
  AdminResolvers,
} from "./Admins/index.js";

import {
  GardenerTypes,
  GardenerQuery,
  GardenerMutation,
  GardenerResolvers,
} from "./Gardeners/index.js";

import {
  SkillTypes,
  SkillQuery,
  SkillMutation,
  SkillResolvers,
} from "./Skills/index.js";

import {
  AddressTypes,
  AddressQuery,
  AddressMutation,
  AddressResolvers,
} from "./Addresses/index.js";

import {
  ProductTypes,
  ProductQuery,
  ProductMutation,
  ProductResolvers,
} from "./Products/index.js";

import { UnionResolvers } from "./UnionResolvers.js";

// remember we only use gql in this file. types in other files are just simple strings
export const typeDefs = gql`
  type Query
  type Mutation
  ${CustomerTypes}
  ${UserTypes}
  ${AdminTypes}
  ${GardenerTypes}
  ${SkillTypes}
  ${AddressTypes}
  ${ProductTypes}
`;
export const resolvers = {
  Query: {
    ...CustomerQuery,
    ...UserQuery,
    ...AdminQuery,
    ...GardenerQuery,
    ...SkillQuery,
    ...AddressQuery,
    ...ProductQuery,
  },
  Mutation: {
    ...CustomerMutation,
    ...UserMutation,
    ...AdminMutation,
    ...GardenerMutation,
    ...SkillMutation,
    ...AddressMutation,
    ...ProductMutation,
  },
  Customer: CustomerResolvers,
  User: UserResolvers,
  Admin: AdminResolvers,
  Gardener: GardenerResolvers,
  Skill: SkillResolvers,
  Address: AddressResolvers,
  Product: ProductResolvers,
  ...UnionResolvers,
};
