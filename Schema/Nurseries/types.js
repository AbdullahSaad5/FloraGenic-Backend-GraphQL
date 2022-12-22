export const NurseryTypes = `
    type Nursery {
        id: ID!
        name: String!
        details: String!
        openingHours: String!
        closingHours: String!
        rating: Float!
        address: String!
        phoneNumber: String
        email: String
        website: String
        images: [String!]
        createdAt: String!
        updatedAt: String!
    }

    extend type Query {
        nurseries: [Nursery!]!
        nursery(id: ID!): Nursery
        nurserySearch(search: String!): [Nursery!]!
    }
    input NurseryCreateInput {
        name: String!
        details: String!
        openingHours: String!
        closingHours: String!
        address: String!
        phoneNumber: String
        email: String
        website: String
        images: [String!]
    }

    input NurseryUpdateInput {
        name: String
        details: String
        openingHours: String
        closingHours: String
        address: String
        phoneNumber: String
        email: String
        website: String
        images: [String!]
    }

    extend type Mutation {
        nurseryCreate(data: NurseryCreateInput!): String!
        nurseryUpdate(id: ID!, data: NurseryUpdateInput!): Nursery
        nurseryDelete(id: ID!): String!
    }
`;
