export const AddressTypes = `
    type Address {
        id: ID!
        userID: ID!
        name: String!
        location: String!
        pin: String!
        city: String!
        setAsDefault: Boolean!
        userDetails: User!
    }

    input AddressInput {
        name: String!
        location: String!
        pin: String
        city: String!
        setAsDefault: Boolean!
    }

    extend type Query {
        address(id: ID!): Address
        addresses: [Address]
    }

    extend type Mutation {
        addressCreate(input: AddressInput!): String!
        addressUpdate(id: ID!, input: AddressInput!): Address
        addressDelete(id: ID!): Address
    }

`;
