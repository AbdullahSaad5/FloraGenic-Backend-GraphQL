export const TagTypes = `

    type Tag {
        id: ID!
        name: String!
        createdAt: String!
        updatedAt: String!
    }

    extend type Query {
        tags: [Tag!]!
    }

    extend type Mutation {
        tagCreate(name: String!): Tag!
        tagUpdate(id: ID!, name: String!): Tag!
        tagDelete(id: ID!): Tag!
    }
`;
