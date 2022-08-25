// TODO Add payments and address to customer schema

export const CustomerTypes = `
    type Customer {
      userID: ID!
      firstName: String!
      lastName: String!
      dateOfBirth: String!
      nationality: String!
      phoneNumber: String!
      gender: String!
      image: String!
      createdAt: String!
      updatedAt: String!
    }

    extend type Query {
      customer(id: ID!): Customer
      customers: [Customer]
      customerSearch(search: String!): [Customer!]
    }

    input CustomerCreateInput {
      userID: ID!
      firstName: String!
      lastName: String!
      dateOfBirth: String!
      nationality: String!
      phoneNumber: String!
      gender: String!
      image: String
    }

    input CustomerUpdateInput {
      id: ID!
      firstName: String
      lastName: String
      dateOfBirth: String
      nationality: String
      phoneNumber: String
      gender: String
      image: String
    }

    input CustomerDeleteInput {
       id: ID!
    }

    extend type Mutation {
     customerCreate(data: CustomerCreateInput!): Customer!
     customerUpdate(data: CustomerUpdateInput!): Customer! 
     customerDelete(data: ID!): String!
     customerBlock(data:ID!): String
    }
`;
