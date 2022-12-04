// TODO Add payments and address to customer schema

export const CustomerTypes = `
    type Customer {
      id: ID!
      firstName: String!
      lastName: String!
      nationality: String!
      phoneNumber: String!
      gender: String!
      image: String
      createdAt: String!
      updatedAt: String!
      userDetails: User!
      payments: [Payment!]
      addresses: [Address!]
    }

    extend type Query {
      customer(id: ID!): Customer
      customers: [Customer!]
      customerSearch(search: String!): [Customer!]
    }

    input CustomerCreateInput {
      firstName: String!
      lastName: String!
      nationality: String!
      phoneNumber: String!
      gender: String!
      image: String
    }

    input CustomerUpdateInput {
      firstName: String
      lastName: String
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
     customerUpdate(id: ID!, data: CustomerUpdateInput!): Customer! 
     customerDelete(id: ID!): String!
     customerBlock(id: ID!): String!
    }
`;
