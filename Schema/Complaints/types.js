export const ComplaintTypes = `
    type Complaint {
        id: ID!
        name: String!
        email: String!
        type: String!
        title: String!
        description: String!
        date: String!
        read: Boolean!
    }

    extend type Query {
        complaints: [Complaint!]!
        complaint(id: ID!): Complaint!
        complaintSearch(search: String!): [Complaint!]!
    }

    input ComplaintCreateInput {  
        name: String!
        email: String!
        type: String!
        title: String!
        description: String!
    }

    extend type Mutation {
        complaintCreate(data: ComplaintCreateInput!): Complaint!
        complaintDelete(id: ID!): String!
        complaintRead(id: ID!): Complaint!
    }
`;
