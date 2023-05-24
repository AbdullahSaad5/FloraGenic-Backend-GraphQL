export const NurseryReviewTypes = `
    type NurseryReview {
        id: ID!
        userID: ID!
        nurseryID: ID!
        rating: Int!
        review: String!
        likes: Int!
        createdAt: String!
        updatedAt: String!
        customerDetails: Customer!
        nurseryDetails: Nursery!
        totalReviews: Int!
    }

    extend type Query {
        nurseryReviews(nurseryID: ID): [NurseryReview!]!
    }


    input NurseryReviewCreateInput {
        nurseryID: ID!
        rating: Int!
        review: String!
    }

    input NurseryReviewUpdateInput {
        rating: Int!
        review: String!
    }

    extend type Mutation {
        nurseryReviewCreate(input: NurseryReviewCreateInput!): NurseryReview!
        nurseryReviewUpdate(id: ID!, input: NurseryReviewUpdateInput!): NurseryReview!
        nurseryReviewDelete(id: ID!): NurseryReview!
    }
`;
