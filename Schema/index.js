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

import {
  CartItemTypes,
  CartItemQuery,
  CartItemMutation,
  CartItemResolvers,
} from "./CartItems/index.js";

import {
  ComplaintTypes,
  ComplaintQuery,
  ComplaintMutation,
  ComplaintResolvers,
} from "./Complaints/index.js";

import {
  NurseryTypes,
  NurseryQuery,
  NurseryMutation,
  NurseryResolvers,
} from "./Nurseries/index.js";

import {
  FavoriteItemTypes,
  FavoriteItemQuery,
  FavoriteItemMutation,
  FavoriteItemResolvers,
} from "./FavoriteItems/index.js";

import {
  ReviewTypes,
  ReviewQuery,
  ReviewMutation,
  ReviewResolvers,
} from "./Reviews/index.js";

import {
  OrderTypes,
  OrderQuery,
  OrderMutation,
  OrderResolvers,
} from "./Orders/index.js";

import { GigTypes, GigQuery, GigMutation, GigResolvers } from "./Gigs/index.js";

import {
  PaymentTypes,
  PaymentQuery,
  PaymentMutation,
  PaymentResolvers,
} from "./Payments/index.js";

import {
  PromoTypes,
  PromoQuery,
  PromoMutation,
  PromoResolvers,
} from "./Promos/index.js";

import { TagTypes, TagQuery, TagMutation, TagResolvers } from "./Tags/index.js";

import {
  NurseryOwnerTypes,
  NurseryOwnerQuery,
  NurseryOwnerMutation,
  NurseryOwnerResolvers,
} from "./NurseryOwner/index.js";

import {
  CategoryTypes,
  CategoryQuery,
  CategoryMutation,
  CategoryResolvers,
} from "./Category/index.js";

import { UnionResolvers } from "./UnionResolvers.js";

// Remember, we only use gql in this file.
// Types in other files are just simple strings.
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
  ${CartItemTypes}
  ${ComplaintTypes}
  ${NurseryTypes}
  ${FavoriteItemTypes}
  ${ReviewTypes}
  ${GigTypes}
  ${OrderTypes}
  ${PaymentTypes}
  ${PromoTypes}
  ${TagTypes}
  ${NurseryOwnerTypes}
  ${CategoryTypes}
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
    ...CartItemQuery,
    ...ComplaintQuery,
    ...NurseryQuery,
    ...FavoriteItemQuery,
    ...ReviewQuery,
    ...GigQuery,
    ...OrderQuery,
    ...PaymentQuery,
    ...PromoQuery,
    ...TagQuery,
    ...NurseryOwnerQuery,
    ...CategoryQuery,
  },
  Mutation: {
    ...CustomerMutation,
    ...UserMutation,
    ...AdminMutation,
    ...GardenerMutation,
    ...SkillMutation,
    ...AddressMutation,
    ...ProductMutation,
    ...CartItemMutation,
    ...ComplaintMutation,
    ...NurseryMutation,
    ...FavoriteItemMutation,
    ...ReviewMutation,
    ...GigMutation,
    ...OrderMutation,
    ...PaymentMutation,
    ...PromoMutation,
    ...TagMutation,
    ...NurseryOwnerMutation,
    ...CategoryMutation,
  },
  Customer: CustomerResolvers,
  User: UserResolvers,
  Admin: AdminResolvers,
  Gardener: GardenerResolvers,
  Skill: SkillResolvers,
  Address: AddressResolvers,
  Product: ProductResolvers,
  CartItem: CartItemResolvers,
  Complaint: ComplaintResolvers,
  Nursery: NurseryResolvers,
  FavoriteItem: FavoriteItemResolvers,
  Review: ReviewResolvers,
  Gig: GigResolvers,
  Order: OrderResolvers,
  Payment: PaymentResolvers,
  Promo: PromoResolvers,
  Tag: TagResolvers,
  NurseryOwner: NurseryOwnerResolvers,
  Category: CategoryResolvers,
  ...UnionResolvers,
};
