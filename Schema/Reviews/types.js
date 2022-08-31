export const ReviewTypes = `
    type Review {
        id: ID!
        userID: ID!
        productID: ID!
        rating: Int!
        review: String!
        likes: Int!
        createdAt: String!
        updatedAt: String!
        customerDetails: User!
        productDetails: Product!
    }

    extend type Query {
        reviews(productID: ID!): [Review!]!
    }


    input ReviewCreateInput {
        userID: ID!
        productID: ID!
        rating: Int!
        review: String!
    }

    input ReviewUpdateInput {
        rating: Int!
        review: String!
    }

    extend type Mutation {
        reviewCreate(input: ReviewCreateInput!): Review!
        reviewUpdate(id: ID!, input: ReviewUpdateInput!): Review!
        reviewDelete(id: ID!): Review!
    }
`;
