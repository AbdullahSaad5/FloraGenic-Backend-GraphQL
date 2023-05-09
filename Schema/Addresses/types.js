export const AddressTypes = `
    type Address {
        id: ID!
        userID: ID!
        name: String!
        location: String!
        city: String!
        setAsDefault: Boolean!
    }

    input AddressInput {
        userID: ID!
        name: String!
        location: String!
        city: String!
        setAsDefault: Boolean!
    }

    extend type Query {
        address(id: ID!): Address
        addresses: [Address]
    }

    extend type Mutation {
        addressCreate(input: AddressInput!): Address
        addressUpdate(id: ID!, input: AddressInput!): Address
        addressDelete(id: ID!): Address
    }

`;
