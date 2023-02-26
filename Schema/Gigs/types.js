export const GigTypes = `
    type Gig{
        id: ID!
        name: String!
        description: String!
        image: String!
        hidden: Boolean!
    }

    extend type Query{
        gigs: [Gig!]!
        gig(id: ID!): Gig!
        gigSearch(search: String!): [Gig!]!
    }

    input GigCreateInput {
        name: String!
        description: String!
        image: String!
    }

    input GigUpdateInput {
        name: String
        description: String
        image: String
    }

    extend type Mutation {
        gigCreate(input: GigCreateInput!): Gig!
        gigUpdate(id: ID!, input: GigUpdateInput!): String!
        gigDelete(id: ID!): String!
        gigHide(id: ID!): String!
    }
`;
