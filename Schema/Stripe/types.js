export const StripeTypes = `
    extend type Mutation {
        createPaymentIntent(amount: Int!): String!
    }
`;
