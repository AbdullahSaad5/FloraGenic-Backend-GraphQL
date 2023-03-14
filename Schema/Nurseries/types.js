export const NurseryTypes = `
    type Nursery {
        id: ID!
        nurseryOwnerID: ID!
        name: String!
        details: String!
        blockedStatus: Boolean!
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
        products: [Product!]!
        nurseryOwner: NurseryOwner!
    }

    extend type Query {
        nurseries: [Nursery!]!
        nursery(id: ID!): Nursery
        nurserySearch(search: String!): [Nursery!]!
        
    }
    input NurseryCreateInput {
        nurseryOwnerID: ID!
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
        nurseryOwnerID: ID
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
        nurseryUpdate(id: ID!, data: NurseryUpdateInput!): String!
        nurseryDelete(id: ID!): String!
        nurseryBlock(id: ID!): String!
    }
`;
