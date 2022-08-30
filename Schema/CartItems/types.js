export const CartItemTypes = `
    type CartItem {
        id: ID!
        productID: ID!
        userID: ID!
        quantity: Int!
        totalPrice: Int!
        productDetails: Product!
        customerDetails: Customer!
        createdAt: String!
        updatedAt: String!
    }

    extend type Query {
        cartItems(userID: ID!): [CartItem!]!
        cartItem(id: ID!): CartItem!
    }

    input CartItemCreateInput {
        productID: ID!
        userID: ID!
        quantity: Int!
    }

    extend type Mutation {
        cartItemCreate(data: CartItemCreateInput!): CartItem!
        cartItemUpdate(id: ID!, quantity: Int!): CartItem!
        cartItemDelete(id: ID!): String!
        cartItemDeleteAll(userID: ID!): String!
    }
    
`;
