export const ProductTypes = `
    type Product {
        id: ID!
        nurseryID: ID!
        nursery: Nursery!
        name: String!
        description: String!
        category: Category!
        hidden: Boolean!
        retailPrice: Float!
        wholesalePrice: Float!
        stock: Int!
        sold: Int!
        images: [String!]!
        overallRating: Float!
        tags: [ID!]!
        reviews: [Review!]
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
        category: ID!
        hidden: Boolean
        retailPrice: Float!
        wholesalePrice: Float!
        stock: Int!
        images: [String!]
        tags: [String!]!
    }

    input ProductUpdateInput {
        nurseryID: ID
        name: String
        description: String
        category: ID
        retailPrice: Float
        wholesalePrice: Float
        stock: Int
        images: [String]
        tags: [String!]
    }

    extend type Mutation {
        productCreate(data: ProductCreateInput!): Product!
        productUpdate(id: ID!, data: ProductUpdateInput!): String!
        productDelete(id: ID!): String!
        productHide(id: ID!): String!
    }
`;
