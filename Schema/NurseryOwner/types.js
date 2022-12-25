export const NurseryOwnerTypes = `
  type NurseryOwner {
    id: ID!
    firstName: String!
    lastName: String!
    gender: String!
    nationality: String!
    phoneNumber: String!
    CNIC: String!
    image: String
    nurseries: [ID!]
    createdAt: String!
    updatedAt: String!
    userDetails: User!
    }

    extend type Query {
        nurseryOwner(id: ID!): NurseryOwner
        nurseryOwners: [NurseryOwner!]
        nurseryOwnerSearch(search: String!): [NurseryOwner!]!
    }

    input NurseryOwnerCreateInput{
        firstName: String!
        lastName: String!
        gender: String!
        nationality: String!
        phoneNumber: String!
        CNIC: String!
        image: String
    }
    
    input NurseryOwnerUpdateInput{
        firstName: String
        lastName: String
        gender: String
        nationality: String
        phoneNumber: String
        CNIC: String
        image: String
    }

    extend type Mutation {
        nurseryOwnerCreate(data: NurseryOwnerCreateInput!): NurseryOwner!
        nurseryOwnerUpdate(id: ID!, data: NurseryOwnerUpdateInput!): NurseryOwner!
        nurseryOwnerDelete(data: ID!): String!
        nurseryOwnerBlock(data:ID!): String!
    }
`;
