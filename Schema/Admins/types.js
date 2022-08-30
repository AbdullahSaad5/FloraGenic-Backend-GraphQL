export const AdminTypes = `
  type Admin {
    id: ID!
    firstName: String!
    lastName: String!
    nationality: String!
    phoneNumber: String!
    CNIC: String!
    image: String
    createdAt: String!
    updatedAt: String!
    userDetails:User!
    }

    extend type Query {
        admin(id: ID!): Admin
        admins: [Admin!]
        adminSearch(search: String!): [Admin!]!
    }

    input AdminCreateInput{
        firstName: String!
        lastName: String!
        nationality: String!
        phoneNumber: String!
        CNIC: String!
        image: String
    }
    
    input AdminUpdateInput{
        firstName: String
        lastName: String
        nationality: String
        phoneNumber: String
        CNIC: String
        image: String
    }


    extend type Mutation {
        adminCreate(data: AdminCreateInput!): Admin!
        adminUpdate(id: ID!, data: AdminUpdateInput!): Admin!
        adminDelete(data: ID!): String!
        adminBlock(data:ID!): String!
    }
    
`;
