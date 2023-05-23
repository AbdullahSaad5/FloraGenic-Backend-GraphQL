export const OrderTypes = `
    type Order {
        id: ID!
        customerID: ID!
        products: [ProductOrder!]!
        totalPrice: Float!
        discount: Float!
        totalPriceAfterDiscount: Float!
        shippingAddress: String!
        orderingDate: String!
        shipmentDate: String
        receivedDate: String
        paymentID: Payment!
        paymentStatus: String!
        orderStatus: String!
        paymentDetails: Payment!
        customerDetails: Customer!
        productsDetails: [Product!]!
    }

    type ProductOrder {
        productID: ID!
        quantity: Int!
        status: String!
    }

    input ProductGetInput {
        customerID: ID
        productID: ID
    }


    extend type Query {
        orders: [Order!]!
        order(id: ID!): Order!
    }


    input OrderCreateInput {
        customerID: ID
        discount: Float
        shippingAddress: ID!
        paymentStatus: String
        paymentType: String!
    }

    input OrderUpdateInput {
        totalPrice: Float
        discount: Float
        shipmentDate: String
        receivedDate: String
        paymentStatus: String
        orderStatus: String
    }

    input ProductOrderCreateInput {
        productID: ID!
        quantity: Int!
    }

    extend type Mutation {
        orderCreate(input: OrderCreateInput): String!
        orderUpdate(id: ID!, input: OrderUpdateInput): String!
        orderDelete(id: ID!): String!
    }
`;
