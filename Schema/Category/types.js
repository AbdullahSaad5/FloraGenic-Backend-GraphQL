export const CategoryTypes = `
    type Category {
        id: ID!
        name: String!
        description: String!
        hiddenStatus: Boolean!
        image: String!
        createdAt: String!
        updatedAt: String!
    }

    extend type Query {
        categories: [Category!]
        category(id: ID!): Category!
    }

    input CategoryCreateInput {
        name: String!
        description: String!
        image: String!
    }

    input CategoryUpdateInput {
        name: String
        description: String
        image: String
    }

    extend type Mutation {
        categoryCreate(data: CategoryCreateInput!): Category!
        categoryUpdate(id: ID!, data: CategoryUpdateInput!): String!
        categoryDelete(id: ID!): String!
    }
    
`;
