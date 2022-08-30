export const FavoriteItemTypes = `
    type FavoriteItem {
        id: ID!
        productID: ID!
        userID: ID!
        createdAt: String!
        customerDetails: Customer!
        productDetails: Product!
    }


    extend type Query {
        favoriteItems(userID: ID!): [FavoriteItem!]!
    }

    input FavoriteItemInput {
        productID: ID!
        userID: ID!
    }

    extend type Mutation {
        createFavoriteItem(input: FavoriteItemInput!): FavoriteItem!
        deleteFavoriteItem(id: ID!): Boolean!
    }
`;
