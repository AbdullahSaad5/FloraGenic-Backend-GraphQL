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
        cartItems: [CartItem!]!
        cartItem(id: ID!): CartItem!
    }

    input CartItemCreateInput {
        productID: ID!
        quantity: Int
    }

    extend type Mutation {
        cartItemCreate(data: CartItemCreateInput!): [CartItem!]!
        cartItemUpdate(id: ID!, quantity: Int!): [CartItem!]!
        cartItemDelete(id: ID!): [CartItem!]!
        cartItemDeleteAll: String!
    }
    
`;
