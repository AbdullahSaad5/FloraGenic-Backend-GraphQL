export const AddressTypes = `
    type Address {
        id: ID!
        userID: ID!
        model_type: String!
        name: String!
        location: String!
        city: String!
        setAsDefault: Boolean!
    }

    input AddressInput {
        userID: ID!
        model_type: String!
        name: String!
        location: String!
        city: String!
        setAsDefault: Boolean!
    }

    extend type Query {
        address(id: ID!): Address
        addresses(userID: ID!, model_type: String!): [Address]
    }

    extend type Mutation {
        addressCreate(input: AddressInput!): Address
        addressUpdate(id: ID!, input: AddressInput!): Address
        addressDelete(id: ID!): Address
    }

`;
