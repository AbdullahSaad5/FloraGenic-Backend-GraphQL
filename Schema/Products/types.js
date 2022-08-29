export const ProductTypes = `
    type Product {
        id: ID!
        nurseryID: ID!
        name: String!
        description: String!
        category: String!
        hidden: Boolean!
        retailPrice: Float!
        wholesalePrice: Float!
        stock: Int!
        sold: Int!
        images: [String!]!
        overallRating: Float!
        tags: [ID!]!
        createdAt: String!
        updatedAt: String!
    }

    input ProductSearchInput {
        name: String
        description: String
        category: String
    }

    extend type Query {
        products(data : ProductSearchInput): [Product!]!
        product(id: ID!): Product!
    }


    input ProductCreateInput {
        nurseryID: ID!
        name: String!
        description: String!
        category: String!
        hidden: Boolean
        retailPrice: Float!
        wholesalePrice: Float!
        stock: Int!
        images: [String!]!
        tags: [ID!]!
    }

    input ProductUpdateInput {
        name: String
        description: String
        category: String
        retailPrice: Float
        wholesalePrice: Float
        stock: Int
        images: [String]
        tags: [ID!]
    }

    extend type Mutation {
        productCreate(data: ProductCreateInput!): Product!
        productUpdate(id: ID!, data: ProductUpdateInput!): Product!
        productDelete(id: ID!): String!
        productHide(id: ID!): String!
    }
`;
